import { AssetPropertiesViewService } from './asset-properties-view.service';
import { of } from 'rxjs';

describe('AssetPropertiesViewService', () => {
  let service: AssetPropertiesViewService;
  let c8yAlarmsMock: any;
  let c8yEventsMock: any;
  let c8yMeasurementsMock: any;
  let c8yOperationMock: any;
  let datePipeMock: any;
  let alarmRealtimeServiceMock: any;
  let eventRealtimeServiceMock: any;
  let operationRealtimeServiceMock: any;
  let measurementRealtimeMock: any;
  const filters = {
    dateFrom: '2023-11-25',
    dateTo: '2024-02-25T03:02:06+05:30',
    pageSize: '2000',
    source: '674366',
    type: 'test'
  };
  const response = {
    status: 200,
    data: [
      {
        count: 2349,
        creationTime: '2024-02-01T05:39:26.300Z',
        firstOccurrenceTime: '2024-02-01T05:39:26.298Z',
        id: '7094',
        lastUpdated: '2024-02-07T08:34:18.687Z',
        text: 'test',
        time: '2024-02-07T08:34:18.681Z',
        type: 'test'
      }
    ]
  };

  beforeEach(async () => {
    c8yAlarmsMock = { list: jest.fn() };
    c8yEventsMock = { list: jest.fn() };
    c8yMeasurementsMock = { list: jest.fn() };
    c8yOperationMock = { list: jest.fn() };

    datePipeMock = { transform: jest.fn() };
    alarmRealtimeServiceMock = { onCreate$: jest.fn() };
    eventRealtimeServiceMock = { onCreate$: jest.fn() };
    operationRealtimeServiceMock = { onCreate$: jest.fn() };
    measurementRealtimeMock = {
      latestValueOfSpecificMeasurement$: jest.fn(),
      onCreate$: jest.fn()
    };
    service = new AssetPropertiesViewService(
      c8yAlarmsMock,
      c8yEventsMock,
      c8yMeasurementsMock,
      c8yOperationMock,
      measurementRealtimeMock,
      alarmRealtimeServiceMock,
      eventRealtimeServiceMock,
      operationRealtimeServiceMock,
      datePipeMock
    );
  });

  it('should exist', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve  the alarms with status 200', async () => {
    // given
    const spyOnList = jest.spyOn(c8yAlarmsMock, 'list').mockReturnValue(Promise.resolve(response));

    // when
    const obj = await service.getAlarms(filters);

    // expect
    expect(spyOnList).toBeCalledTimes(1);
    expect(obj.length).toBe(1);
    expect(spyOnList).toHaveBeenCalledWith(filters);
  });

  it('should retrieve  the events with status 200', async () => {
    // given
    const spyOnList = jest.spyOn(c8yEventsMock, 'list').mockReturnValue(Promise.resolve(response));

    // when
    const obj = await service.getEvents(filters);

    // expect
    expect(spyOnList).toBeCalledTimes(1);
    expect(obj.length).toBe(1);
    expect(spyOnList).toHaveBeenCalledWith(filters);
  });

  it('should retrieve  the Measurements with status 200', async () => {
    // given
    const spyOnList = jest
      .spyOn(c8yMeasurementsMock, 'list')
      .mockReturnValue(Promise.resolve(response));

    // when
    const obj = await service.getMeasurements(filters);

    // expect
    expect(spyOnList).toBeCalledTimes(1);
    expect(obj.length).toBe(1);
    expect(spyOnList).toHaveBeenCalledWith(filters);
  });

  it('should retrieve  the Operations with status 200', async () => {
    // given
    const spyOnList = jest
      .spyOn(c8yOperationMock, 'list')
      .mockReturnValue(Promise.resolve(response));

    // when
    const obj = await service.getOperation(filters);

    // expect
    expect(spyOnList).toBeCalledTimes(1);
    expect(obj.length).toBe(1);
    expect(spyOnList).toHaveBeenCalledWith(filters);
  });

  it('should retrieve the values for the computed properties Last device message and update the time stamp it to the dateSet variable.', async () => {
    // given
    jest.spyOn(datePipeMock, 'transform').mockReturnValue(new Date());
    const spyOnC8yAlarmsMock = jest
      .spyOn(c8yAlarmsMock, 'list')
      .mockReturnValue(Promise.resolve(response));
    jest.spyOn(alarmRealtimeServiceMock, 'onCreate$').mockReturnValue(of(response));
    const spyOnC8yEventsMock = jest
      .spyOn(c8yEventsMock, 'list')
      .mockReturnValue(Promise.resolve(response));
    jest.spyOn(eventRealtimeServiceMock, 'onCreate$').mockReturnValue(of(response));
    const spyOnC8yMeasurementsMock = jest
      .spyOn(c8yMeasurementsMock, 'list')
      .mockReturnValue(Promise.resolve(response));
    jest.spyOn(measurementRealtimeMock, 'onCreate$').mockReturnValue(of(response));
    const spyOnC8yOperationMock = jest
      .spyOn(c8yOperationMock, 'list')
      .mockReturnValue(Promise.resolve(response));
    jest.spyOn(operationRealtimeServiceMock, 'onCreate$').mockReturnValue(of(response));
    const spyOnNext = jest.spyOn((service as any).variableSubject, 'next');

    // when
    await service.getLastDeviceMessage({
      device: { id: 1254 },
      creationTime: '',
      id: ''
    } as any);

    // then
    expect(spyOnC8yAlarmsMock).toBeCalledTimes(1);
    expect(spyOnC8yEventsMock).toBeCalledTimes(1);
    expect(spyOnC8yMeasurementsMock).toBeCalledTimes(1);
    expect(spyOnC8yOperationMock).toBeCalledTimes(1);
    expect(spyOnNext).toHaveBeenCalledTimes(5);
  });

  it('should return latest measurement value', () => {
    // given
    const datapoint = {
      fragment: 'fragment',
      series: 'series',
      __target: { id: '789546' },
      uniqId: 'uniqId'
    };
    const mockedMeasurement = {
      fragment: {
        series: { unit: 'unit', value: 10 }
      },
      time: '2024-03-12T12:00:00Z'
    };
    measurementRealtimeMock.latestValueOfSpecificMeasurement$.mockReturnValueOnce(
      of(mockedMeasurement)
    );

    // when
    service.getLatestMeasurement$(datapoint).subscribe({
      next: measurement => {
        // Assert the returned measurement
        expect(measurement.unit).toBe('unit');
        expect(measurement.value).toBe(10);
        expect(measurement.date).toBe('2024-03-12T12:00:00Z');
        expect(measurement.id).toBe('uniqId');
      }
    });
  });
});
