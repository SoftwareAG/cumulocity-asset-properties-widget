import { AssetPropertiesViewService } from './asset-properties-view.service';

describe('AssetPropertiesViewService', () => {
  let service: AssetPropertiesViewService;
  let c8yAlarmsMock: any;
  let c8yEventsMock: any;
  let c8yMeasurementsMock: any;
  let c8yOperationMock: any;
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
    service = new AssetPropertiesViewService(c8yAlarmsMock, c8yEventsMock, c8yMeasurementsMock, c8yOperationMock);
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
    const spyOnList = jest.spyOn(c8yMeasurementsMock, 'list').mockReturnValue(Promise.resolve(response));

    // when
    const obj = await service.getMeasurements(filters);

    // expect
    expect(spyOnList).toBeCalledTimes(1);
    expect(obj.length).toBe(1);
    expect(spyOnList).toHaveBeenCalledWith(filters);
  });

  it('should retrieve  the Operations with status 200', async () => {
    // given
    const spyOnList = jest.spyOn(c8yOperationMock, 'list').mockReturnValue(Promise.resolve(response));

    // when
    const obj = await service.getOperation(filters);

    // expect
    expect(spyOnList).toBeCalledTimes(1);
    expect(obj.length).toBe(1);
    expect(spyOnList).toHaveBeenCalledWith(filters);
  });
});
