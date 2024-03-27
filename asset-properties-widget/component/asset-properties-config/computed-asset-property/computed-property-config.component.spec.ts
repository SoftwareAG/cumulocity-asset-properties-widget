import { ComputedPropertyConfigComponent } from './computed-property-config.component';

describe('ComputedPropertyConfigComponent', () => {
  let component: ComputedPropertyConfigComponent;
  let bsModalRefMock: any;
  const property = {
    name: 'lastMeasurement',
    config: { isValid: false, type: 'c8y_Bulding' }
  } as any;

  beforeEach(async () => {
    bsModalRefMock = {
      hide: jest.fn()
    };

    component = new ComputedPropertyConfigComponent(bsModalRefMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit savePropertyConfiguration event and hide modal when onSaveButtonClicked is called', () => {
    // given
    component.savePropertyConfiguration.emit = jest.fn();
    const property = { name: 'lastMeasurement', config: { isValid: true } } as any;
    component.tempProperty = property;
    component.index = 1;
    const expectedEmitValue = { property, index: 1 };

    // when
    component.onSaveButtonClicked();
    // expect
    expect(bsModalRefMock.hide).toHaveBeenCalled();
    expect(component.savePropertyConfiguration.emit).toHaveBeenCalledWith(expectedEmitValue);
  });

  it('should emit cancelPropertyConfiguration event and hide modal when onCancelButtonClicked is called', () => {
    // given
    component.index = 1;
    component.cancelPropertyConfiguration.emit = jest.fn();

    // when
    component.onCancelButtonClicked();

    // expect
    expect(bsModalRefMock.hide).toHaveBeenCalled();
    expect(component.cancelPropertyConfiguration.emit).toHaveBeenCalledWith(1);
  });

  it('should disable save button when tempProperty.name is lastMeasurement and config.isValid is false', () => {
    // given
    component.tempProperty = property;

    // when
    const result = component.isSaveButtonDisabled();

    // expect
    expect(result).toBeTruthy();
  });

  it('should disable save button when tempProperty.config.type is undefined', () => {
    // given
    component.tempProperty = property;

    // when
    const result = component.isSaveButtonDisabled();

    // expect
    expect(result).toBeTruthy();
  });
});
