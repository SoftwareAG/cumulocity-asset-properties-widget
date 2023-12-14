import {
  Component,
  Inject,
  Input,
  SimpleChanges
} from '@angular/core';
import * as L from 'leaflet';
import {
  MAP_DEFAULT_CONFIG,
  MAP_TILE_LAYER,
  MapComponent,
  MapConfig,
  MapService,
  PositionManagedObject,
  defaultMapConfig,
  getC8yMarker
} from '@c8y/ngx-components/map';
import { FormArray, FormGroup } from '@angular/forms';
import { IManagedObject } from '@c8y/client';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { toggleFullscreen } from './fullscreen.util';
import { ManagedObjectRealtimeService, MapDefaultConfig, MapTileLayer } from '@c8y/ngx-components';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';

// Düsseldorf
export const defaultMapLocation = {
  lat: defaultMapConfig.center[0],
  lng: defaultMapConfig.center[1]
} as const;

@Component({
  selector: 'c8y-asset-location',
  templateUrl: './asset-location.component.html'
})
export class AssetLocationComponent extends MapComponent {
  @Input() isEdit: boolean;
  @Input() locationMO: IManagedObject;
  @Input() form: FormGroup;
  config: MapConfig = {
    center: defaultMapConfig.center,
    zoomLevel: 13,
    color: 'green',
    icon: 'c8y-icon-location'
  };
  assets: PositionManagedObject;
  isMarkerDraggable = false;
  isMapClickable = false;
  dragListener: L.LeafletEventHandlerFn;
  formSubscription: Subscription;
  showMap = true;

  constructor(
    protected moRealtimeService: ManagedObjectRealtimeService,
    protected mapService: MapService,
    @Inject(MAP_TILE_LAYER) protected layers$: Observable<MapTileLayer[]>,
    @Inject(MAP_DEFAULT_CONFIG)
    protected defaultConfig$: Observable<MapDefaultConfig>,
    protected translateService: TranslateService,
    private activatedRouter: ActivatedRoute) {
    super(moRealtimeService, mapService, layers$, defaultConfig$, translateService);
  }

  async ngOnInit() {
    const leaflet = await this.mapService.getLeaflet();
    if (leaflet) {
      const { contextData } =
        !this.activatedRouter.parent || this.activatedRouter.snapshot.data.context
          ? this.activatedRouter.snapshot.data
          : this.activatedRouter.parent.snapshot.data;
      this.assets = contextData ? contextData : this.locationMO;
      if (this.assets.c8y_Position.lat && this.assets.c8y_Position.lng)
        this.config.center = [this.assets.c8y_Position.lat, this.assets.c8y_Position.lng];      
      this.setView(this.assets.c8y_Position.lat, this.assets.c8y_Position.lng);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isEdit?.currentValue) {
      this.showMap = true;
      this.isMarkerDraggable = true;
      this.isMapClickable = true;
      queueMicrotask(() => this.map.invalidateSize());
      this.map.on('click', event => {
        this.onClickOfMap(event);
        this.updateMarker(event.latlng.lat, event.latlng.lng);
      });
      this.formSubscription = this.form?.valueChanges.subscribe(value => {
        this.updateMarker(value.c8y_Position.lat, value.c8y_Position.lng);
        this.setView(value.c8y_Position.lat, value.c8y_Position.lng);
      });
      return;
    }
    if (!changes.isEdit?.currentValue) {
      const isAnyValueMissing = this.checkIfAnyValueIsMissing(
        this.locationMO?.c8y_Position.lat,
        this.locationMO?.c8y_Position.lng
      );
      if (isAnyValueMissing) {
        this.showMap = false;
        return;
      }
      this.isMarkerDraggable = false;
      this.isMapClickable = false;
      this.updateMarker(this.locationMO?.c8y_Position.lat, this.locationMO?.c8y_Position.lng);
      this.setView(this.locationMO?.c8y_Position.lat, this.locationMO?.c8y_Position.lng);
    }
  }

  ngOnDestroy() {
    this.formSubscription?.unsubscribe();
    if (this.markers && this.dragListener) {
      this.markers.forEach(marker => {
        marker.off('drag', this.dragListener);
      });
    }
  }

  /**
   * This command is used to prefill the latitude and longitude values in the form when the marker is dragged.
   */
  onMarkerDrag(event: L.LeafletEvent) {
    if (this.form) {
      const properties = this.form.get('c8y_Position') as FormArray;
      properties?.get('lat').patchValue(event.target._latlng.lat);
      properties?.get('lng').patchValue(event.target._latlng.lng);
    }
  }

  /**
   * This method is used to update the marker with the specified values and if any one of the values is not availble, sets
   * showWarning to true.
   * @param latitude - The latitude of the marker
   * @param longitude - The longitude of the marker
   */
  updateMarker(latitude: number, longitude: number) {
    const isAnyValueMissing = this.checkIfAnyValueIsMissing(latitude, longitude);
    if (!isAnyValueMissing) {
      [latitude, longitude] = this.setLatLngValues(latitude, longitude);
      const asset: any = {
        c8y_Position: {
          latitude,
          longitude
        }
      };

      if (this.map) {
        const icon = this.getAssetIcon(this.assets);
        const leafletMarker = this.leaflet.marker([latitude, longitude], {
          icon: icon,
          draggable: this.isMarkerDraggable
        });
        if (this.isMarkerDraggable) {
          this.dragListener = event => {
            this.onMarkerDrag(event);
          };
          leafletMarker.on('dragend', this.dragListener);
        }
        this.clearMarkers();
        const marker = getC8yMarker(leafletMarker, asset);
        this.addMarkerToMap(marker);
        this.setView(latitude, longitude);
      }
      return;
    }
    this.clearMarkers();
  }

  /**
   * This command is used to prefill the latitude and longitude values in the form on click of map.
   */
  onClickOfMap(event: L.LeafletMouseEvent) {
    if (this.form) {
      const properties = this.form.get('c8y_Position') as FormArray;
      properties?.get('lat').patchValue(event.latlng.lat);
      properties?.get('lng').patchValue(event.latlng.lng);
    }
  }

  /**
   * Used to enable full screen of the map.
   */
  enableFullscreen() {
    toggleFullscreen(this.mapElement.nativeElement);
  }

  /**
   * Checks if any one of the values i.e., latitude/longitude is undefined or null.
   * @param latitude Latitude value of the position
   * @param longitude Longitude value of the position
   * @returns returns true if any one of the values are both the values are missing else it returns false.
   */
  checkIfAnyValueIsMissing(latitude: number, longitude: number) {
    return this.isNullOrUndefined(latitude) || this.isNullOrUndefined(longitude);
  }

  /**
   * Sets the view of the map based on the position of marker.
   * @param latitude - Latitude of the marker
   * @param longitude Longitude of the marker
   */
  setView(latitude: number, longitude: number) {
    if (latitude && longitude && this.map) {
      [latitude, longitude] = this.setLatLngValues(latitude, longitude);
      this.map?.setView([latitude, longitude]);
    }
  }

  setLatLngValues(latitude: number, longitude: number): [number, number] {
    latitude = this.isNullOrUndefined(latitude) ? defaultMapLocation.lat : latitude;
    longitude = this.isNullOrUndefined(longitude) ? defaultMapLocation.lng : longitude;
    return [latitude, longitude];
  }

  private isNullOrUndefined(value): boolean {
    return value === null || value === undefined;
  }

  // async ngAfterViewInit() {
  //   if (!this.leaflet) {
  //     this.leaflet = await this.mapService.getLeaflet();
  //   }      
  //   combineLatest([this.layers$, this.defaultConfig$])
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe(([layers, defaultConfig]) => {
  //       this.initMap(layers, defaultConfig);
  //       this.updateMarker(this.locationMO?.c8y_Position.lat, this.locationMO?.c8y_Position.lng);
  //       this.setView(this.locationMO?.c8y_Position.lat, this.locationMO?.c8y_Position.lng);     
  //     });   
  // }

  async resizeMap(){
    this.ngOnDestroy();
    await this.ngAfterViewInit();
    //this.map.dragging.enable();
  }
}
