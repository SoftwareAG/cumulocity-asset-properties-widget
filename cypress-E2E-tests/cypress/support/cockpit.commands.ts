import cockpit_page_elements from './page_objects/cockpit_page_elements';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            /**
             * This command is being used to navigate to groups page in cockpit application.
             * Usage: cy.navigateToGroupsPage();
             */
            navigateToGroupsPage(): void;

            /**
             * This command is being used to verify the group is being created or not in groups page.
             * @param groupName Specify the group name.
             * Usage: cy.verifyThePresenceOfGroup("Building");
             */
            verifyThePresenceOfGroup(groupName: string): void;

            /**
             * This commad is being used to verify that the group is being deleted.
             * @param groupName Specify the group name
             * Usage: cy.verifyTheAbsenceOfGroup("Building");
             */
            verifyTheAbsenceOfGroup(groupName: string): void;
        }
    }
}

Cypress.Commands.add('navigateToGroupsPage', () => {
    cy.get(cockpit_page_elements.groupLink, { timeout: 20000 }).click({ force: true });

});

Cypress.Commands.add('verifyThePresenceOfGroup', (groupName) => {
    cy.get(`a[class='interact'][title='${groupName}']`).should('be.visible');
});

Cypress.Commands.add('verifyTheAbsenceOfGroup', (groupName) => {
    cy.get(`a[class='interact'][title='${groupName}']`).should('not.exist');
 });
