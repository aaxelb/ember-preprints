import Ember from 'ember';

import CasAuthenticatedRouteMixin from 'ember-osf/mixins/cas-authenticated-route';
import ResetScrollMixin from '../mixins/reset-scroll';
import SetupSubmitControllerMixin from '../mixins/setup-submit-controller';
import Analytics from 'ember-osf/mixins/analytics';

/**
 * @module ember-preprints
 * @submodule routes
 */

/**
 * Creates a preprint record
 * @class Submit Route Handler
 */
export default Ember.Route.extend(Analytics, ResetScrollMixin, CasAuthenticatedRouteMixin, SetupSubmitControllerMixin, {
    currentUser: Ember.inject.service('currentUser'),
    panelActions: Ember.inject.service('panelActions'),
    model() {
        // Store the empty preprint to be created on the model hook for page. Node will be fetched
        //  internally during submission process.
        return this.store.createRecord('preprint', {
            subjects: []
        });
    },
    afterModel() {
        return this.get('theme.provider').then(provider => {
            if (!provider.get('allowSubmissions')) {
                this.replaceWith('page-not-found');
            }
        })
    },
    setupController(controller, model) {
        this.setupSubmitController(controller, model);
        return this._super(...arguments);
    },
    actions: {
        willTransition: function(transition) {
            // Displays confirmation message if user attempts to navigate away from Add Preprint process with unsaved changes
            var hasFile = this.controller.get('file') !== null || this.controller.get('selectedFile') !== null;

            if (hasFile && !this.controller.get('savingPreprint') && !confirm('Are you sure you want to abandon this preprint?')) {
                transition.abort();
            }
        }
    }
});
