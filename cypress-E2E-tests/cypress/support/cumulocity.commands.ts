import { InventoryAssignment, InventoryRolePermission } from './models/data.model';
import cumulocity_page_elements from './page_objects/cumulocity_page_elements';
import { IManagedObject, IUserGroup, IUserInventoryRole } from '@c8y/client';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * navigateToDigitalTwinApp() is being used to navigate to digital twin manager application.
       * Usage: cy.navigateToDigitalTwinApp();
       */
      navigateToDigitalTwinApp(): void;

      /**
       * This command is being used to login to the cumulocity tenant
       * @param userName User name of the tenant
       * @param passWord Password of the tenant
       * Usage: cy.loginToCumulocity("Tester1", "xyz")
       */
      loginToCumulocity(username: string, passWord: string): void;

      /**
       * This command is being used to logout from the cumulocity tenant.
       * Usage: cy.logoutFromCumulocity()
       */
      logoutFromCumulocity(): void;

      /**
       * This command is being used to navigate to cockpit application.
       * Usage: cy.navigateToCockpitApp()
       */
      navigateToCockpitApp(): void;

      /**
       * This command is being used to navigate to device management application.
       * Usage: cy.navigateToDeviceManagementApp()
       */
      navigateToDeviceManagementApp(): void;

      /**
       * This command is being used to apply the branding changes.
       * Usage: cy.updateBranding()
       */
      updateBranding(): void;
      /**
       * This command is gets the tenant id using the current user session
       * Usage: cy.getTenantIdUsingCurrentSession()
       */
      getTenantIdUsingCurrentSession(): Chainable<string>;
      /**
       * This command is being used to get the tenant Id
       * @param username Username of the tenant
       * @param password Password of the tenant
       * Usage: cy.getTenantId("abc", "xyz")
       */
      getTenantId(username: string, password: string): Chainable<string>;

      /**
       * This command is being used to login to the tenant
       * @param username Username to login (optional param)
       * Usage: cy.login()
       */
      login(username?: string): void;

      /**
       * This command is being used to hit an api request.
       * @param args Pass an object which will have required key value pairs.
       * Usage: cy.apiRequest({
          url: '/inventory/managedObjects',
          method: 'POST',
          body: assetObject[i]
          });)
       */
      apiRequest(...args: any): Chainable<any>;

      /**
       * This command is being used to visit and wait untill page loads.
       * @param url Specify the url
       * Usage: visitAndWaitUntilPageLoad("apps/digital-twin-manager/index.html#/assets")
       */
      visitAndWaitUntilPageLoad(url: string): void;

      /**
       * This command is being used to create a user in Cumulocity administration under users.
       * @param username Specify the username
       * Usage: createUser("qwerty")
       */

      createUser(username: string): void;

      /**
       * This command is being used to grant access to a user for a specific app.
       * @param username Specify the username
       * @param appId Specify the application id
       * Usage: grantApplicationAccess("abc", "123")
       */

      grantApplicationAccess(username: string, appId: string): void;

      /**
       * This command is being used to delete user created in Cumulocity administration under users.
       * @param username Specify the username to delete
       * Usage: deleteUser("abc")
       */

      deleteUser(username: string): void;

      /**
       * This command is being used to get the application id of an app.
       * Usage: createUser()
       */

      getApplicationId(): Chainable<string>;

      /**
       * This command is being used to assign user with Inventory role for the asset.
       * @param details Specify the the value for assetId, username and roleId Example: [{assetId: "123", username: "test", roleId: 1}]
       * Usage: assignUserInventoryRole(details)
       */

      assignUserInventoryRole(details: any[]): void;

      /**
       * This command is being used to create a role in Cumulocity administration under roles, assign permissions to it and then assign to user.
       * @param roleName Specify the role name
       * @param permissions Specify the role permissions as an array
       * @param username Specify the user to assign role created
       * Usage: createRoleAndAssignPermission("AppManagementRead", "['ROLE_INVENTORY_READ','ROLE_APPLICATION_MANAGEMENT_READ']", "test_user")
       */

      createRoleWithPermissionAndAssignToUser(
        roleName: string,
        permissions: string[],
        username: string
      ): Chainable<IUserGroup>;

      /**
       * Create cumulocity global role with base permissions
       * @param roleName Name for the global role
       * @param permissions Array of cumulocity permissions
       * Usage: cy.createRoleWithPermissions('My Inventory Role',['ROLE_INVENTORY_READ','ROLE_INVENTORY_CREATE'])
       */
      createRoleWithPermissions(roleName: string, permissions: string[]): Chainable<any>;
      /**
       * This command is being used to assign a role to a user.
       * @param roleId Specify the role Id
       * @param username Specify the username to assign role
       * Usage: assignRoleToUser("19", "test_user")
       */

      assignRoleToUser(roleId: string, username: string): Chainable<void>;

      /**
       * This command is being used to delete role created in Cumulocity administration under Roles.
       * @param roleId Specify the role name to delete
       * Usage: deleteRole("AppManagementRead")
       */

      deleteRole(roleName: string): void;

      /**
       * This command is being used to logout user from cumulocity application.
       * Usage: logout()
       */

      logout(): void;

      /**
       * Custom command: getRoleByName
       *
       * Description:
       * This command allows you to get role details by name
       *
       * Usage:
       * cy.getRoleByName(rolename)
       *
       * @param {string} roleName - Name of the Cumulocity IoT global role
       *
       * @example
       * cy.getRoleByName('Digital Twin Manager')
       *
       * @returns {IUserGroup}
       */
      getRoleByName(roleName: string): Chainable<IUserGroup>;
      /**
       * Custom command: createManagedObjects
       *
       * Description:
       * This command allows you to create multiple managed objects
       *
       * Usage:
       * cy.createManagedObjects(managedObjectArray)
       *
       * @param {Partial<IManagedObject>} managedObjects - Name of the Cumulocity IoT global role
       *
       * @example
       * cy.createManagedObjects([...mos])
       *
       * @returns {Chainable<IManagedObject[]>}
       */
      createManagedObjects(managedObjects: Partial<IManagedObject>[]): Chainable<IManagedObject[]>;

      /**
       * Custom command: assignPermissionsToRole
       *
       * Description:
       * This command allows you to assign permission to a global role
       *
       * Usage:
       * cy.assignPermissionsToRole(roleId,permission)
       *
       * @param {string} roleId - Id of the global role
       * @param {string[]} permissions - Array of permissions to assign to the role
       *
       * @example
       * cy.assignPermissionsToRole(['ROLE_INVENTORY_READ','ROLE_INVENTORY_CREATE'])
       *
       * @returns {void}
       */
      assignPermissionsToRole(roleId: string, permissions: string[]): void;

      /**
       * Custom command: unassignPermissionsFromRole
       *
       * Description:
       * This command allows you to unassign permissions from a role
       *
       * Usage:
       * cy.unassignPermissionsFromRole(roleId, permissions)
       *
       * @param {string} roleId - Id of global role
       * @param {string[]} permissions - array of permissions to unassign from the role
       *
       * @example
       * cy.unassignPermissionsFromRole(['ROLE_INVENTORY_READ','ROLE_APPLICATION_MANAGEMENT_READ'])
       *
       * @returns {void}
       */
      unassignPermissionsFromRole(roleId: string, permissions: string[]): void;

      /**
       * Custom command: createInventoryRole
       *
       * Description:
       * This command allows you to create an inventory role
       *
       * Usage:
       * cy.createInventoryRole(roleName,description)
       *
       * @param {string} roleName - Name of this inventory role
       * @param {string} description - a description for this inventory role
       *
       * @example
       * cy.createInventoryRole('DTM Inventory Reader','Can view assets')
       *
       * @returns {Chainable<IUserInventoryRole>}
       */
      createInventoryRole(roleName: string, description?: string): Chainable<IUserInventoryRole>;

      /**
       * Custom command: assignPermissionsToInventoryRole
       *
       * Description:
       * This command allows you to assign permissions to an inventory role
       *
       * Usage:
       * cy.assignPermissionsToInventoryRole(roleName,description)
       *
       * @param {string} roleId - Id of this inventory role
       * @param {InventoryRolePermission} permissions - an array of permission object
       *
       * @example
       * cy.assignPermissionsToInventoryRole('12',[{ "scope": "MANAGED_OBJECT","permission": "ADMIN","type": "*"}])
       *
       * @returns void
       */
      assignPermissionsToInventoryRole(
        roleId: number,
        permissions: InventoryRolePermission[]
      ): void;

      /**
       * Custom command: deleteInventoryRole
       *
       * Description:
       * This command allows you to delete an inventory role
       *
       * Usage:
       * cy.deleteInventoryRole(roleId)
       *
       * @param {string} roleId - Id of this inventory role
       *
       * @example
       * cy.deleteInventoryRole('12')
       *
       * @returns void
       */
      deleteInventoryRole(roleId: number): void;

      /**
       * Custom command: assignInventoryRoleToAnAsset
       *
       * Description:
       * This command allows you to assign an inventory role to a user
       *
       * Usage:
       * cy.assignInventoryRolesToAGroup(roleId,username,assetId)
       *
       * @param {number[]} roleIds - array of ids of inventory roles
       * @param {string} username - Username of the user to assign this role to
       * @param {string} assetId - Id of the asset managed object
       *
       * @example
       * cy.assignInventoryRolesToAGroup(['12'],'dtm_test_user','124578')
       *
       * @returns void
       */
      assignInventoryRolesToAGroup(roleIds: number[], username: string, assetId: string): void;
      /**
       * Custom command: getUserInventoryAssignments
       *
       * Description:
       * This command allows you to get inventory assignments of a user
       *
       * Usage:
       * cy.getUserInventoryAssignments(username)
       *
       * @param {string} username - Username of the user to assign this role to
       *
       * @example
       * cy.getUserInventoryAssignments('dtm_test_user')
       *
       * @returns Chainable<InventoryAssignment[]>
       */
      getUserInventoryAssignments(username: string): Chainable<InventoryAssignment[]>;

      /**
       * Custom command: unassignInventoryRolesFromAGroup
       *
       * Description:
       * This command allows you to unassign an inventory role from a user
       *
       * Usage:
       * cy.unassignInventoryRolesFromAGroup(roleId,username)
       *
       * @param {number[]} roleIds - array of ids of inventory roles
       * @param {string} username - Username of the user to assign this role to
       *
       * @example
       * cy.unassignInventoryRolesFromAGroup(['12'],'dtm_test_user')
       *
       * @returns void
       */
      unassignInventoryRolesFromAGroup(roleIds: number[], username: string, assetId: string): void;
      /**
       * Custom command: getInventoryRoleByName
       *
       * Description:
       * This command allows you to get an inventory role by its name
       *
       * Usage:
       * cy.getInventoryRoleByName(roleId,username)
       *
       * @param {number[]} roleName - name of the role
       *
       * @example
       * cy.getInventoryRoleByName('DTM inventory reader')
       *
       * @returns void
       */
      getInventoryRoleByName(roleName: string): Chainable<IUserInventoryRole>;
    }
  }
}

Cypress.Commands.add('loginToCumulocity', (userName, passWord) => {
  cy.get(cumulocity_page_elements.userNameTextBoxC8y).type(userName);
  cy.get(cumulocity_page_elements.pwdTextBoxC8y).type(passWord);
  cy.get(cumulocity_page_elements.loginButtonC8y).click();
});

Cypress.Commands.add('navigateToDigitalTwinApp', () => {
  cy.get(cumulocity_page_elements.menuButtonC8y).click({ force: true });
  cy.get(cumulocity_page_elements.digitalTwinApp).should('be.visible').click({ force: true });
});

Cypress.Commands.add('logoutFromCumulocity', () => {
  cy.get(cumulocity_page_elements.c8yUserIcon).click();
  cy.get(cumulocity_page_elements.c8yLogoutUserIcon).should('be.visible').click();
});

Cypress.Commands.add('navigateToCockpitApp', () => {
  cy.get(cumulocity_page_elements.menuButtonC8y).click({ force: true });
  cy.get(cumulocity_page_elements.cockpitApp).should('be.visible').click({ force: true });
});

Cypress.Commands.add('navigateToDeviceManagementApp', () => {
  cy.get(cumulocity_page_elements.menuButtonC8y).click({ force: true });
  cy.get(cumulocity_page_elements.deviceManagementApp).should('be.visible').click({ force: true });
});

Cypress.Commands.add('updateBranding', () => {
  const confirmationPopup = 'c8y-alert-outlet strong';
  const applyBrandingConfigurationButton = "button[title*='Apply']";
  const applyConfirmationButton = "button[title='Apply']";
  cy.get(cumulocity_page_elements.menuButtonC8y).click();
  cy.get(cumulocity_page_elements.administrationApp).click({ force: true });
  cy.get('#navigator_node_settings').click({ force: true });
  cy.get("button[title='Branding']").click({ force: true });
  cy.get(applyBrandingConfigurationButton).should('be.enabled').click();
  cy.get(applyConfirmationButton).should('be.visible').click();
  cy.get(confirmationPopup, { timeout: 40000 }).should('be.visible');
});

Cypress.Commands.add('getTenantId', (username, password) => {
  cy.request({
    method: 'GET',
    url: '/tenant/currentTenant',
    auth: {
      username,
      password
    }
  }).then(response => response.body.name);
});

Cypress.Commands.add('getTenantIdUsingCurrentSession', () => {
  cy.apiRequest({
    method: 'GET',
    url: '/tenant/currentTenant'
  }).then(response => response.body.name);
});

Cypress.Commands.add('login', username => {
  const userName = username ? username : Cypress.env('username');
  cy.getTenantId(userName, Cypress.env('password')).then(tenantId => {
    cy.session(
      'dtmsession_' + userName,
      () => {
        cy.request({
          method: 'POST',
          url: `/tenant/oauth?tenant_id=${tenantId}`,
          body: {
            grant_type: 'PASSWORD',
            username: userName,
            password: Cypress.env('password'),
            tfa_code: undefined
          },
          form: true
        }).then(() => {
          cy.getCookie('XSRF-TOKEN').then(token => {
            window.localStorage.setItem('authToken', token.value);
          });
        });
      },
      {
        validate: () => {
          cy.apiRequest({
            method: 'GET',
            url: '/user/currentUser'
          })
            .its('status')
            .should('eq', 200);
        }
      }
    );
  });
});

Cypress.Commands.add('apiRequest', (...args) => {
  let defaultOptions;
  cy.getCookie('XSRF-TOKEN').then(cookies => {
    if (!cookies) defaultOptions = {};
    else {
      defaultOptions = {
        headers: {
          'X-XSRF-TOKEN': cookies.value,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      };
    }
    let options: any = {};
    if (Cypress._.isObject(args[0])) {
      options = Object.assign({}, args[0]);
      if (options.headers) {
        options.headers = { ...defaultOptions.headers, ...options.headers };
      }
    } else if (args.length === 1) {
      [options.url] = args;
    } else if (args.length === 2) {
      [options.url, options.method] = args;
    } else if (args.length === 3) {
      [options.url, options.method, options.body] = args;
    }
    cy.request(Object.assign({}, defaultOptions, options));
  });
});

Cypress.Commands.add('visitAndWaitUntilPageLoad', url => {
  cy.visit(url);
  cy.get('.app-switcher-dropdown', { timeout: 60000 }).should('be.visible');
});

Cypress.Commands.add('createUser', username => {
  cy.getTenantId(Cypress.env('username'), Cypress.env('password')).then(tenantId => {
    cy.apiRequest({
      method: 'POST',
      url: `/user/${tenantId}/users`,
      body: {
        userName: username,
        password: Cypress.env('password'),
        email: username + '@softwareag.com'
      }
    }).then(() => {
      cy.getApplicationId().then((appId: string) => {
        cy.grantApplicationAccess(username, appId);
      });
    });
  });
});

Cypress.Commands.add('getApplicationId', () => {
  cy.apiRequest({
    method: 'GET',
    url: '/application/applicationsByName/Asset properties widget'
  }).then(response => {
    return response.body.applications[0].id;
  });
});

Cypress.Commands.add('grantApplicationAccess', (username, appId) => {
  cy.getTenantId(Cypress.env('username'), Cypress.env('password')).then(tenantId => {
    cy.apiRequest({
      method: 'PUT',
      url: `/user/${tenantId}/users/${username}`,
      body: {
        applications: [{ id: appId, type: 'HOSTED' }]
      }
    });
  });
});

Cypress.Commands.add('deleteUser', username => {
  cy.getTenantId(Cypress.env('username'), Cypress.env('password')).then(tenantId => {
    cy.apiRequest({
      method: 'DELETE',
      url: `/user/${tenantId}/users/${username}`
    });
  });
});

Cypress.Commands.add('assignUserInventoryRole', details => {
  cy.getTenantId(Cypress.env('username'), Cypress.env('password')).then(tenantId => {
    for (let i = 0; i < details.length; i++) {
      cy.apiRequest({
        method: 'POST',
        url: `/user/${tenantId}/users/${details[i].username}/roles/inventory`,
        body: { managedObject: details[i].assetId, roles: [{ id: details[i].roleId }] }
      });
    }
  });
});

Cypress.Commands.add(
  'createRoleWithPermissionAndAssignToUser',
  (roleName, permissions, username) => {
    cy.getTenantId(Cypress.env('username'), Cypress.env('password')).then(tenantId => {
      cy.apiRequest({
        method: 'POST',
        url: `/user/${tenantId}/groups`,
        body: {
          name: roleName
        }
      }).then(response => {
        const promises = [];
        for (const permission of permissions) {
          promises.push(
            cy.apiRequest({
              method: 'POST',
              url: `/user/${tenantId}/groups/${response.body.id}/roles`,
              body: {
                role: {
                  self: `${Cypress.config('baseUrl')}/user/roles/${permission}`
                }
              }
            })
          );
        }
        return Cypress.Promise.all(promises).then(() => {
          cy.assignRoleToUser(response.body.id, username).then(() => {
            return response.body;
          });
        });
      });
    });
  }
);

Cypress.Commands.add('assignRoleToUser', (roleId, username) => {
  cy.getTenantId(Cypress.env('username'), Cypress.env('password')).then(tenantId => {
    cy.apiRequest({
      method: 'POST',
      url: `/user/${tenantId}/groups/${roleId}/users`,
      body: {
        user: {
          id: username,
          self: `${Cypress.config('baseUrl')}/user/${tenantId}/users/${username}`
        }
      }
    });
  });
});

Cypress.Commands.add('deleteRole', roleName => {
  cy.getTenantId(Cypress.env('username'), Cypress.env('password')).then(tenantId => {
    cy.getRoleByName(roleName).then(role => {
      cy.apiRequest({
        method: 'DELETE',
        url: `/user/${tenantId}/groups/${role.id}`
      });
    });
  });
});

Cypress.Commands.add('logout', () => {
  cy.apiRequest({
    method: 'POST',
    url: '/user/logout'
  });
});

Cypress.Commands.add('getRoleByName', roleName => {
  cy.getTenantId(Cypress.env('username'), Cypress.env('password')).then(tenantId => {
    cy.apiRequest({
      method: 'GET',
      url: `/user/${tenantId}/groupByName/${roleName}`
    }).then(response => {
      return response.body;
    });
  });
});

Cypress.Commands.add('createManagedObjects', managedObjects => {
  const promises = [];
  for (const mo of managedObjects) {
    promises.push(
      cy.apiRequest({
        method: 'POST',
        url: '/inventory/managedObjects',
        body: mo
      })
    );
  }

  Cypress.Promise.all(promises).then(responses => {
    const createdMOs: Partial<IManagedObject> = [];

    for (const response of responses) {
      createdMOs.push(response.body);
    }

    cy.wrap(null).then(() => {
      return createdMOs;
    });
  });
});

Cypress.Commands.add('assignPermissionsToRole', (roleId, permissions) => {
  cy.getTenantId(Cypress.env('username'), Cypress.env('password')).then(tenantId => {
    const promises = [];
    for (const permission of permissions) {
      promises.push(
        cy.apiRequest({
          method: 'POST',
          url: `/user/${tenantId}/groups/${roleId}/roles`,
          body: {
            role: {
              self: `${Cypress.config('baseUrl')}/user/roles/${permission}`
            }
          }
        })
      );
    }
    Cypress.Promise.all(promises);
  });
});

Cypress.Commands.add('unassignPermissionsFromRole', (roleId, permissions) => {
  cy.getTenantId(Cypress.env('username'), Cypress.env('password')).then(tenantId => {
    const promises = [];
    for (const permission of permissions) {
      promises.push(
        cy.apiRequest({
          method: 'DELETE',
          url: `/user/${tenantId}/groups/${roleId}/roles/${permission}`
        })
      );
    }
    Cypress.Promise.all(promises);
  });
});

Cypress.Commands.add('createInventoryRole', (roleName, description) => {
  cy.apiRequest({
    method: 'POST',
    url: '/user/inventoryroles',
    body: {
      name: roleName,
      description: description || '',
      permissions: []
    }
  }).then(response => {
    return response.body;
  });
});

Cypress.Commands.add('assignPermissionsToInventoryRole', (roleId, permissions) => {
  cy.apiRequest({
    method: 'PUT',
    url: `/user/inventoryroles/${roleId}`,
    body: {
      permissions
    }
  });
});

Cypress.Commands.add('deleteInventoryRole', roleId => {
  cy.apiRequest({
    method: 'DELETE',
    url: `/user/inventoryroles/${roleId}`
  });
});

Cypress.Commands.add('assignInventoryRolesToAGroup', (roleIds, username, assetId) => {
  const roles = [];
  for (const roleId of roleIds) {
    roles.push({ id: roleId });
  }
  cy.getTenantId(Cypress.env('username'), Cypress.env('password')).then(tenantId => {
    cy.getUserInventoryAssignments(username).then(inventoryAssignments => {
      if (inventoryAssignments.length === 0) {
        cy.apiRequest({
          method: 'POST',
          url: `/user/${tenantId}/users/${username}/roles/inventory`,
          body: {
            managedObject: assetId,
            roles
          }
        });
      } else {
        for (const assignment of inventoryAssignments) {
          if (assignment.managedObject === assetId) {
            cy.apiRequest({
              method: 'PUT',
              url: `/user/${tenantId}/users/${username}/roles/inventory/${assignment.id}`,
              body: {
                managedObject: assetId,
                roles
              }
            });
            break;
          }
        }
      }
    });
  });
});

Cypress.Commands.add('getUserInventoryAssignments', username => {
  cy.getTenantId(Cypress.env('username'), Cypress.env('password')).then(tenantId => {
    cy.apiRequest({
      method: 'GET',
      url: `/user/${tenantId}/users/${username}/roles/inventory`
    }).then(response => {
      return response.body.inventoryAssignments;
    });
  });
});

Cypress.Commands.add('unassignInventoryRolesFromAGroup', (roleIds, username, assetId) => {
  cy.getTenantId(Cypress.env('username'), Cypress.env('password')).then(tenantId => {
    cy.getUserInventoryAssignments(username).then(inventoryAssignments => {
      for (const assignment of inventoryAssignments) {
        if (assignment.id === assetId) {
          if (assignment.roles.length > 1) {
            // remove role ids from the list of current assignments
            const rolesToKeep = [];
            for (const role of assignment.roles) {
              if (!roleIds.includes(role.id)) rolesToKeep.push({ id: role.id });
            }
            cy.apiRequest({
              method: 'PUT',
              url: `/user/${tenantId}/users/${username}/roles/inventory/${assignment.id}`,
              body: {
                roles: rolesToKeep
              }
            });
          } else {
            cy.apiRequest({
              method: 'DELETE',
              url: `/user/${tenantId}/users/${username}/roles/inventory/${assignment.id}`
            });
          }
          break;
        }
      }
    });
  });
});

Cypress.Commands.add('getInventoryRoleByName', roleName => {
  cy.apiRequest({
    method: 'GET',
    url: '/user/inventoryroles?pageSize=100'
  }).then(response => {
    for (const role of response.body.roles) {
      if (role.name === roleName) return role;
    }
  });
});
