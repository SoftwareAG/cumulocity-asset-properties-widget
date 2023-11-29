import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IManagedObjectBinary } from '@c8y/client';
import {
  AlertService,
  C8yJSONSchema,
  gettext,
  FilesService,
} from '@c8y/ngx-components';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AssetPropertiesItem } from './asset-properties.model';
import { JSONSchema7 } from 'json-schema';
import { clone } from 'lodash-es';

@Component({
  selector: 'c8y-asset-properties-item',
  templateUrl: './asset-properties-item.component.html',
})
export class AssetPropertiesItemComponent
  implements AssetPropertiesItem, OnChanges
{
  @Input()
  key: string;
  @Input()
  value: any;
  @Input()
  label: string;
  @Input()
  type: string;
  @Input()
  file: IManagedObjectBinary;
  @Input()
  complex: AssetPropertiesItem[];
  @Input()
  isEdit: boolean;
  @Input()
  jsonSchema: JSONSchema7;
  @Input()
  lastUpdated: string;
  @Input()
  isEditable: boolean;
  @Input()
  active: boolean;

  form: FormGroup;
  fields: FormlyFieldConfig[];
  model: any;
  previewImage;

  constructor(
    private alert: AlertService,
    private c8yJsonSchemaService: C8yJSONSchema,
    public filesService: FilesService
  ) {}

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes.isEdit) {
      this.resolveJsonSchema();
      await this.resolveFile();
    }
  }

  private async resolveFile() {
    if (this.file) {
      try {
        const imageFile = await this.filesService.getFile(this.file);
        this.previewImage = await this.getPreviewIfImage(imageFile);
      } catch (ex) {
        this.alert.danger(gettext('File could not be loaded.'));
      }
    }
  }

  private formComplexPropsValue() {
    const complexProps = {};
    this.complex.forEach(complexObj => {
      if (complexObj.file) {
        complexProps[complexObj.key] = complexObj.value;
      } else if (this.value[complexObj.key] != null) {
        complexProps[complexObj.key] = this.value[complexObj.key];
      }
    });
    return complexProps;
  }

  private getModel() {
    if (this.complex && this.complex.length > 0) {
      return {
        [this.key]: this.formComplexPropsValue()
      };
    }
    return {
      [this.key]: clone(this.value)
    };
  }

  private resolveJsonSchema() {
    if (this.jsonSchema) {
      const fieldConfig = this.c8yJsonSchemaService.toFieldConfig(this.jsonSchema, this.jsonSchema);
      this.form = new FormGroup({});
      this.fields = [fieldConfig];
      this.model = this.getModel();
    }
  }

  private async getPreviewIfImage(imageFile: File) {
    if (this.filesService.haveValidExtensions(imageFile, 'image')) {
      return this.filesService.toBase64(imageFile);
    }
  }
}
