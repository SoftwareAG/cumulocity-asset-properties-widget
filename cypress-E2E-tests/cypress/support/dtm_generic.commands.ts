import { IManagedObject } from '@c8y/client';
import { UrlParams } from './models/data.model';
import dtm_generic_page_elements from './page_objects/dtm_generic_page_elements';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * This command is being used to navigate to to Localisation page.
       * Usage: cy.navigateToLocalizationPage();
       */
      navigateToLocalizationPage(): void;

      /**
       * This command is being used to navigate to Assets page.
       * Usage: cy.navigateToAssetsPage();
       */
      navigateToAssetsPage(): Chainable<void>;

      /**
       * This command is being used to navigate to navigate to Asset properties page.
       * Usage: cy.navigateToPropertyLibraryPage();
       */
      navigateToPropertyLibraryPage(): Chainable<void>;

      /**
       * This command is being used to navigate to Asset models page
       * Usage: cy.navigateToAssetTypesPage();
       */
      navigateToAssetTypesPage(): Chainable<void>;

      /**
       * This command is being used to navigate to Home page.
       * Usage: cy.navigateToHomePage();
       */
      navigateToHomePage(): void;

      /**
       * This command is being used to verify the alert message in the screen.
       * @param alertMsg Alert text should be passed as a parameter.
       * Usage: cy.verifyTheAlertMsg("Are you sure you want to delete the item?");
       */
      verifyTheAlertMsg(alertMsg: string): void;

      /**
       * This command is being used to configure the columns.
       * @param option Specify the option (Check/Uncheck).
       * @param columnName Name of the column.
       * Usage: configureColumns("Check", "Description");
       */
      configureColumns(option: string, columnName: string): void;

      /**
       * This command is being used to clear the data in the application.
       * Usage: cy.cleanup();
       */
      cleanup(): void;

      /**
       * This command is being used to clear the data that has the given fragment type.
       * Usage: cy.cleanup(fragmentType);
       * @param fragmentType cumulocity fragment type to identify the objects to delete.
       */
      cleanupByFragmentType(fragmentType: string): void;

      /**
       * This command enables you to clear data that satisfies the query condition
       * @param query - inventory api query string
       * @overload
       */
      cleanupByQuery(query: string, urlParams?: UrlParams): void;

      /**
       * This command is being used to create the device.
       * @param deviceName Name of the device
       * @param pastDate Specify the "pastDate" only if you want to create a device for a previous date.
       * Usage: createDevice('Device1');
       */
      createDevice(deviceName: string, pastDate?: any): void;

      /**
       * This command is being used to delete all the devices.
       * Usage: deleteAllDevices();
       */
      deleteAllDevices(): void;

      /**
       * This command is being used to add the child device.
       * @param parentDevice Name of the parent device.
       * @param childDevice Name of the child device.
       * addChildDevice("Device1", "DEvice2");
       */
      addChildDevice(parentDevice: string, childDevice: string): void;

      /**
       * This command is being used to confirm whether modified changes has to be saved or cancelled (Re-confirmation).
       * @param option Specify an option (Cancel/Confirm).
       * Usage: editConfirmationPopup("Cancel");
       */
      editConfirmationPopup(option: string): void;

      /**
       * This command is being used to get the json file form the fixtures folder.
       * @param jsonName Name of the file.
       * Usage: getJsonFile("BulkImport_Test_Data.json");
       */
      getJsonFile(jsonName: string): Chainable<any>;

      /**
       * This command is used to create an asset(parent/child) through API
       * @param assetObject asset object that needs to be created
       * Usage: apiCreateSimpleAsset(assets)
       */
      apiCreateSimpleAsset(assetObject): Chainable<string>;

      /**
       * This command is used to assign the child asset to the respective parent asset.
       * @param childAssets The list of child assets that needs to be assigned to parent.
       * @param asset The parent asset.
       * Usage: apiAssignChildAsset(['Floor'],'Building')
       */
      apiAssignChildAsset(childAssets: string[], asset: string);

      /**
       * This command is being used to generate the unique id based on timestamp.
       * Usage: cy.getUniqueId()
       */
      getUniqueId(): any;

      /**
       * This command is being used to create a new alarm
       * @param alarmObject Pass an alarm object.
       * Note: Specify the "pastDate" in the object only if you want to create an alarm for a previous date.
       * ex: {
              deviceName: 'Device1',
              text: 'Device Running for more than standard time',
              severity: 'MAJOR',
              status: 'ACTIVE',
              pastDate: {
                month: 2,
                day: 15
              }
            }
       * Usage: createNewAlarm(alarmObject);
       */
      createNewAlarm(alarmObject: any): void;

      /**
       * Retrieves managed objects by query
       * Usage: cy.getManagedObjectsByQuery('query=$filter(has(c8y_IsAsset)))', {onlyRoots:true}).then(managedObjects => {
       * cy.log(managedObjects.length)
       * })
       */
      getManagedObjectsByQuery(query: string, urlParams: UrlParams): Chainable<IManagedObject[]>;

      /** verifies alert notification message
       * Usage: cy.verifyAlertNotificationMessage(expectedMessage)
       */
      verifyAlertNotificationMessage(message: string): Chainable<any>;
      /** verifies alert notification details
       * Usage: cy.verifyAlertNotificationDetails(expectedDetail)
       */
      verifyAlertNotificationDetails(message: string): Chainable<any>;

      /**
       * This command is being used to add an intercept to the api calls.
       * @param method http method
       * @param endPoint api endpoint
       * @param networkStatus OPTIONAL_PARAMETER: require Successful or failure call.
       * Default value is 'SUCCESS'. Available - ['SUCCESS', 'FAILURE']
       * @param nthCallToFail OPTIONAL_PARAMETER: On which nth call the api must fail.
       * Default value is 1, i.e automatically first call will fail
       * Usage:  cy.addNetworkIntercept('DELETE', '/inventory/managedObjects/**', 'FAILURE', 1);
       */
      addNetworkIntercept(
        method: string,
        endPoint: any,
        networkStatus?: string,
        nthCallToFail?: number
      ): any;

      /**
       * This command is being used to convert date string into UTC.
       * @param inputDateString date string to be passed as input.
       * Usage: cy.convertToUTC('1 Sept 2023, 11:33:31');
       */
      convertToUTC(inputDateString: string): Chainable<any>;

      /**
       * This command is being used to get the creation/ last updated time of the asset/asset model/sset property.
       * @param option Specify whether you want get the created/updated time (options: created/updated)
       * @param selection Available selections are asset/assetmodel/assetproperty
       * @param label label of your selection.
       * Usage: cy.getCreationOrLastUpdatedTime('created', 'asset', 'Amazon');
       */
      getCreationOrLastUpdatedTime(
        option: string,
        selection: string,
        label: string
      ): Chainable<any>;

      /**
       * This command is being used to delete the grid configuration
       * @param fragmentName Specify the fragment name based on the page. Options are listed below.
       * ( dtm-asset-types-grid-config, dtm-assets-grid-config, sub-assets-grid, dtm-translation-grid-config )
       * usage: cy.apiDeleteGridConfig('dtm-asset-types-grid-config');
       */
      apiDeleteGridConfig(page: string): void;

      /**
       * This command is being used to drop an element to the target locator.
       * @param dropSelector Provide the target selector
       * Usage: cy.get(sourceElement).dragTo(targetElement);
       */
      dragTo(dropSelector: string): void;
    }
  }
}

Cypress.Commands.add('navigateToLocalizationPage', () => {
  cy.get(dtm_generic_page_elements.configurationLink).click({ force: true });
  cy.get(dtm_generic_page_elements.localizationLink).click({ force: true });
});

Cypress.Commands.add('navigateToAssetsPage', () => {
  cy.get(dtm_generic_page_elements.assetsLink).click({ force: true });
});

Cypress.Commands.add('navigateToPropertyLibraryPage', () => {
  cy.get(dtm_generic_page_elements.configurationLink).click({ force: true });
  cy.get(dtm_generic_page_elements.propertyLibraryLink).click({ force: true });
});

Cypress.Commands.add('navigateToAssetTypesPage', () => {
  cy.get(dtm_generic_page_elements.configurationLink).click({ force: true });
  cy.get(dtm_generic_page_elements.assetTypesLink).click({ force: true });
});

Cypress.Commands.add('navigateToHomePage', () => {
  cy.get(dtm_generic_page_elements.homePageLink).click({ force: true });
});

Cypress.Commands.add('verifyTheAlertMsg', alertMsg => {
  const alertPopup = 'div.c8y-prompt.alert';
  cy.get(alertPopup)
    .should('be.visible')
    .contains(alertMsg);
});

Cypress.Commands.add('configureColumns', (option, columnName) => {
  const column = `label[title='${columnName}']>input`;
  cy.get(dtm_generic_page_elements.configureCloumnsButton).click();
  if (option === 'Check') {
    cy.get(column).check();
  } else if (option === 'Uncheck') {
    cy.get(column).uncheck();
  } else {
    cy.log('Mentioned option is incorrect');
  }
  cy.get(dtm_generic_page_elements.configureCloumnsButton).click();
});

Cypress.Commands.add('cleanup', () => {
  cy.getUniqueId().then(id => {
    cy.apiRequest({
      method: 'GET',
      url: `/inventory/managedObjects?pageSize=2000&nocache=${id}&query=$filter=(has(c8y_IsAssetProperty) and (owner eq ${Cypress.env(
        'username'
      )}) and (not(name eq 'c8y_Position')))`,
      failOnStatusCode: false
    }).then((response: any) => {
      for (const mo of response.body.managedObjects) {
        cy.log('Deleting ', mo.id);
        cy.apiRequest({
          method: 'DELETE',
          url: `/inventory/managedObjects/${mo.id}`,
          failOnStatusCode: false
        });
      }
    });
    cy.apiRequest({
      method: 'GET',
      url: `/inventory/managedObjects?pageSize=2000&nocache=${id}&query=$filter=(has(c8y_IsAssetType) and (owner eq ${Cypress.env(
        'username'
      )}) and (not(name eq 'c8y_DeviceGroup')))`,
      failOnStatusCode: false
    }).then((response: any) => {
      for (const mo of response.body.managedObjects) {
        cy.log('Deleting ', mo.id);
        cy.apiRequest({
          method: 'DELETE',
          url: `/inventory/managedObjects/${mo.id}`,
          failOnStatusCode: false
        });
      }
    });
    cy.apiRequest({
      method: 'GET',
      url: `/inventory/managedObjects?pageSize=2000&fragmentType=c8y_IsAsset&withChildren=false&onlyRoots=true&owner=${Cypress.env(
        'username'
      )}&nocache=${id}`,
      failOnStatusCode: false
    }).then((response: any) => {
      for (const mo of response.body.managedObjects) {
        cy.log('Deleting ', mo.id);
        cy.apiRequest({
          method: 'DELETE',
          url: `/inventory/managedObjects/${mo.id}`,
          failOnStatusCode: false
        });
      }
    });
  });
});

Cypress.Commands.add('cleanupByFragmentType', (fragmentType: string) => {
  cy.apiRequest({
    method: 'GET',
    url: `/inventory/managedObjects?pageSize=100&fragmentType=${fragmentType}`,
    failOnStatusCode: false
  }).then((response: any) => {
    if (!response.body.managedObjects) return;
    for (const mo of response.body.managedObjects) {
      cy.log('Deleting ', mo.id);
      cy.apiRequest({
        method: 'DELETE',
        url: `/inventory/managedObjects/${mo.id}`
      });
    }
  });
});

Cypress.Commands.add('cleanupByQuery', (query, urlParams) => {
  cy.getManagedObjectsByQuery(query, urlParams).then(managedObjects => {
    if (!managedObjects) return;
    for (const mo of managedObjects) {
      cy.log('Deleting ', mo.id);
      cy.apiRequest({
        method: 'DELETE',
        url: `/inventory/managedObjects/${mo.id}`
      });
    }
  });
});

Cypress.Commands.add('createDevice', (deviceName, pastDate) => {
  const request = {
    url: '/inventory/managedObjects',
    method: 'Post',
    body: {
      name: deviceName,
      c8y_IsDevice: {},
      c8y_DeviceTypes: ['deviceSubsetType'],
      c8y_SupportedOperations: ['c8y_Restart']
    }
  }
  if(pastDate){
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - pastDate.month);
    currentDate.setDate(currentDate.getDate() - pastDate.day);
    request.body['creationTime'] = currentDate.toISOString();
  }
  cy.apiRequest(request);
});

Cypress.Commands.add('deleteAllDevices', () => {
  cy.apiRequest({
    url: 'inventory/managedObjects?fragmentType=c8y_IsDevice',
    method: 'GET',
    failOnStatusCode: false
  }).then((response: any) => {
    for (const mo of response.body.managedObjects) {
      cy.log('Deleting ', mo.id);
      cy.apiRequest({
        method: 'DELETE',
        url: `/inventory/managedObjects/${mo.id}`
      });
    }
  });
});

Cypress.Commands.add('addChildDevice', (parentDevice, childDevice) => {
  cy.apiRequest({
    url: `/inventory/managedObjects?q=$filter=(name eq '${parentDevice}' and has('c8y_IsDevice'))`,
    method: 'GET'
  }).then((response: any) => {
    const parentDeviceId = response.body.managedObjects[0].id;
    cy.apiRequest({
      method: 'GET',
      url: `/inventory/managedObjects?q=$filter=(name eq '${childDevice}' and has('c8y_IsDevice'))`
    }).then((response: any) => {
      const childDeviceId = response.body.managedObjects[0].id;
      cy.log(childDeviceId);
      cy.apiRequest({
        url: `/inventory/managedObjects/${parentDeviceId}/childDevices`,
        method: 'POST',
        body: {
          managedObject: { id: `${childDeviceId}` }
        }
      });
    });
  });
});

Cypress.Commands.add('editConfirmationPopup', option => {
  cy.get('.alert-warning')
    .should('be.visible')
    .then(() => {
      if (option === 'Cancel') {
        // requiredCheckbox.check({force: true})
        cy.get(dtm_generic_page_elements.cancelEditPopupButton).click();
      } else {
        cy.get(dtm_generic_page_elements.confirmEditPopupButton).click();
        cy.get('.alert > div', { timeout: 3000 }).should('exist');
        cy.get(dtm_generic_page_elements.closeAlert).click();
      }
    });
});

Cypress.Commands.add('getJsonFile', jsonName => {
  cy.fixture(jsonName).then(function(data) {
    return data;
  });
});

Cypress.Commands.add('apiCreateSimpleAsset', assetObject => {
  for (let i = 0; i < assetObject.length; i++) {
    cy.apiRequest({
      url: '/inventory/managedObjects',
      method: 'POST',
      body: assetObject[i]
    }).then(response => response.body.id);
  }
});

Cypress.Commands.add('apiAssignChildAsset', (childAssets, asset) => {
  cy.apiRequest({
    method: 'GET',
    url: `/inventory/managedObjects?query=$filter=((has(c8y_IsAsset)) and ('name' eq '${asset}'))`,
    failOnStatusCode: false
  }).then((response: any) => {
    const assetId = response.body.managedObjects[0].id;
    for (let childAsset = 0; childAsset < childAssets.length; childAsset++) {
      cy.apiRequest({
        method: 'GET',
        url: `/inventory/managedObjects?query=$filter=((has(c8y_IsAsset)) and ('name' eq '${
          childAssets[childAsset]
        }'))`,
        failOnStatusCode: false
      }).then((response: any) => {
        cy.log(response);
        const childAssetId = response.body.managedObjects[0].id;
        cy.apiRequest({
          method: 'POST',
          url: `/inventory/managedObjects/${assetId}/childAssets`,
          body: {
            managedObject: {
              id: childAssetId
            }
          }
        });
      });
    }
  });
});

Cypress.Commands.add('getUniqueId', () => {
  const uniqueSeed = Date.now().toString();
  return Cypress._.uniqueId(uniqueSeed);
});

Cypress.Commands.add('createNewAlarm', (alarmObject) => {
  cy.apiRequest({
    method: 'GET',
    url: `/inventory/managedObjects?pageSize=1&query=$filter=(has(c8y_IsDevice) and ('name' eq '${
      alarmObject.deviceName
    }'))`,
    failOnStatusCode: false
  }).then((response: any) => {
    const deviceId = response.body.managedObjects[0].id;
    const currentDate = new Date();
    if('pastDate' in alarmObject){
      currentDate.setMonth(currentDate.getMonth() - alarmObject.pastDate.month);
      currentDate.setDate(currentDate.getDate() - alarmObject.pastDate.day);
    }
    const formattedTimestamp = currentDate.toISOString();
    const modifiedObj = {
      source: {
        id: deviceId
      },
      type: 'DeviceAlarm',
      text: alarmObject.text,
      severity: alarmObject.severity,
      status: alarmObject.status,
      time: formattedTimestamp
    };
    cy.apiRequest({
      method: 'POST',
      url: '/alarm/alarms',
      body: modifiedObj,
      failOnStatusCode: false
    })
      .its('status')
      .should('eq', 201);
  });
});

Cypress.Commands.add('getManagedObjectsByQuery', (query, urlParams) => {
  const baseUrl = '/inventory/managedObjects';
  let url;
  const params = Object.entries(urlParams)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([key, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  if (params) url = `${baseUrl}?${params}&${query}`;
  else url = `baseUrl?${query}`;

  cy.apiRequest({
    method: 'GET',
    url: url,
    failOnStatusCode: false
  }).then(response => {
    return response.body.managedObjects;
  });
});

Cypress.Commands.add('verifyAlertNotificationMessage', message => {
  cy.get('[data-cy=c8y-alert--message]').within(() => {
    cy.get('div strong.message').should('have.text', message);
  });
});

Cypress.Commands.add('verifyAlertNotificationDetails', message => {
  cy.get('[data-cy=c8y-alert--message]').within(() => {
    cy.get('button[title="Show details"]')
      .should('be.visible')
      .click();
    cy.get('div > div > pre > code').should('contain', message);
  });
});

Cypress.Commands.add(
  'addNetworkIntercept',
  (method: string, endPoint: any, networkStatus: string = 'SUCCESS', nthCallToFail: number = 1) => {
    let apiCallCounter = 0;

    switch (networkStatus) {
      case 'SUCCESS':
        return cy.intercept(method, endPoint);
      case 'FAILURE':
        return cy.intercept(method, endPoint, req => {
          apiCallCounter++;
          if (apiCallCounter === nthCallToFail) {
            req.reply({
              statusCode: 500,
              body: 'Something went wrong in the inventory API'
            });
          }
        });
    }
  }
);

Cypress.Commands.add('convertToUTC', inputDateString => {
  const inputDate = new Date(inputDateString);

  const utcYear = inputDate.getUTCFullYear();
  const utcMonth = (inputDate.getUTCMonth() + 1).toString().padStart(2, '0');
  const utcDay = inputDate
    .getUTCDate()
    .toString()
    .padStart(2, '0');
  const utcHours = inputDate
    .getUTCHours()
    .toString()
    .padStart(2, '0');
  const utcMinutes = inputDate
    .getUTCMinutes()
    .toString()
    .padStart(2, '0');
  const utcSeconds = inputDate
    .getUTCSeconds()
    .toString()
    .padStart(2, '0');

  const utcTimeString = `${utcYear}-${utcMonth}-${utcDay}T${utcHours}:${utcMinutes}:${utcSeconds}`;
  cy.wrap(utcTimeString).then(value => {
    return value;
  });
});

Cypress.Commands.add(
  'getCreationOrLastUpdatedTime',
  (option: string, selection: string, label: string) => {
    let url;
    switch (selection) {
      case 'asset':
        url = `/inventory/managedObjects?query=$filter=((has(c8y_IsAsset)) and ('name' eq '${label}'))`;
        break;
      case 'assetmodel':
        url = `/inventory/managedObjects?query=$filter=((has(c8y_IsAssetType)) and ('label' eq '${label}'))`;
        break;
      case 'assetproperty':
        url = `/inventory/managedObjects?query=$filter=((has(c8y_JsonSchema)) and (has(c8y_IsAssetProperty)) and ('label' eq '${label}'))`;
        break;
    }
    return cy
      .apiRequest({
        method: 'GET',
        url: url,
        failOnStatusCode: false
      })
      .then((response: any) => {
        let time;
        if (option === 'created') {
          time = response.body.managedObjects[0].creationTime;
        } else {
          time = response.body.managedObjects[0].lastUpdated;
        }
        cy.wrap(time).then(value => {
          return value;
        });
      });
  }
);

Cypress.Commands.add('apiDeleteGridConfig', fragmentName => {
  cy.apiRequest({
    method: 'GET',
    url: `/inventory/managedObjects?fragmentType=${fragmentName}${Cypress.env('username')}`,
    failOnStatusCode: false
  }).then(response => {
    if (response.body.managedObjects[0]) {
      const [{id}] = response.body.managedObjects;
      cy.log(`Deleting grid-config ${id}`);
      cy.apiRequest({
        method: 'DELETE',
        url: `/inventory/managedObjects/${id}`,
        failOnStatusCode: false
      });
    }
  });
});

Cypress.Commands.add('dragTo', { prevSubject: 'element' }, function(subject, targetEl) {
  // Currently realMouseDown etc. only works in browsers based on Chromium.
  cy.wrap(subject)
    .first()
    .realMouseDown({ button: 'left', position: 'center', scrollBehavior: 'nearest' })
    .realMouseMove(10, 0, { position: 'center', scrollBehavior: 'nearest' });
  cy.get(targetEl)
    .first()
    .realMouseMove(10, 0, { position: 'center', scrollBehavior: 'nearest' })
    .realMouseUp({ position: 'center', scrollBehavior: 'center' });
  cy.wait(1000);
});
