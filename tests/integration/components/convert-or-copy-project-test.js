import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, skip } from 'ember-qunit';

moduleForComponent('convert-or-copy-project', 'Integration | Component | convert or copy project', {
    integration: true,
    beforeEach: function() {
        let noop = () => {};
        this.set('noop', noop);
    }
});

skip('it renders', function(assert) {
    this.render(hbs`{{convert-or-copy-project
        clearDownstreamFields=(action noop)
        nextUploadSection=(action noop)
    }}`);

    assert.equal(this.$('#convertExistingOrCreateComponent label').first().text().trim(), 'Make a new component');
});

skip('choosing copy changes mode to copy', function(assert){
    this.set('convertOrCopy', null);

    this.render(hbs`{{convert-or-copy-project
        clearDownstreamFields=(action noop)
        nextUploadSection=(action noop)
        convertOrCopy=convertOrCopy
    }}`);

    this.$('#copy').click();

    assert.equal(this.get('convertOrCopy'), 'copy');
});

skip('choosing copy makes nodeTitle null and requires a title change', function(assert){
    this.set('nodeTitle', 'Como nossos pais');
    this.set('titleValid', true);

    this.render(hbs`{{convert-or-copy-project
        clearDownstreamFields=(action noop)
        nextUploadSection=(action noop)
        nodeTitle=nodeTitle titleValid=titleValid
    }}`);

    this.$('#copy').click();

    assert.ok(!this.get('titleValid'));
    assert.equal(this.get('nodeTitle'), null);
});

skip('choosing convert displays converting options and changes mode to convert', function(assert){
    this.set('convertOrCopy', null);

    this.render(hbs`{{convert-or-copy-project
        clearDownstreamFields=(action noop)
        nextUploadSection=(action noop)
        convertOrCopy=convertOrCopy
    }}`);

    assert.equal(this.get('convertOrCopy'), null);
    assert.ok(!this.$('.exclamation-confirm-convert').length);

    this.$('#convert').click();

    assert.equal(this.get('convertOrCopy'), 'convert');
    assert.ok(this.$('.exclamation-confirm-convert').length);
});

skip('choosing convert makes nodeTitle the title of the node about to be converted and does not require change', function(assert){
    this.set('nodeTitle', null);
    this.set('titleValid', null);
    this.set('node', {
        title: 'Mas, que Nada!'
    });

    this.render(hbs`{{convert-or-copy-project
        clearDownstreamFields=(action noop)
        nextUploadSection=(action noop)
        node=node nodeTitle=nodeTitle titleValid=titleValid
    }}`);

    this.$('#convert').click();

    assert.ok(this.get('titleValid'));
    assert.equal(this.get('nodeTitle'), 'Mas, que Nada!');
});

skip('can confirm conversion and passes the convertProjectConfirmed flag up', function(assert){
    this.set('convertProjectConfirmed', false);

    this.render(hbs`{{convert-or-copy-project
        clearDownstreamFields=(action noop)
        nextUploadSection=(action noop)
        convertProjectConfirmed=convertProjectConfirmed
    }}`);

    this.$('#convert').click();
    this.$('.btn-success').click();

    assert.ok(this.get('convertProjectConfirmed'));
});
