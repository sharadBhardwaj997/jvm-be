'use strict';
const BaseGenerator = require('../base-generator');
const constants = require('../constants');
const _ = require('lodash');

module.exports = class extends BaseGenerator {

    constructor(args, opts) {
        super(args, opts);
        this.configOptions = this.options.configOptions || {};

        this.argument("entityName", {
            type: String,
            required: true,
            description: "Entity name"
        });

        this.option('base-path', {
            type: String,
            desc: "Base URL path for REST Controller"
        })
    }

    get initializing() {
        this.logSuccess('Generating JPA entity, repository, service and controller');
        return {
            validateEntityName() {
                const context = this.context;
                console.log(`EntityName: ${this.options.entityName}, basePath: ${this.options.basePath}`);
                //this.env.error("The entity name is invalid");
            }
        }
    }

    /*get prompting() {
        return prompts.prompting;
    }*/

    configuring() {
        this.configOptions = Object.assign({}, this.configOptions, this.config.getAll());
        console.log('console.log',this.configOptions)
        this.configOptions.basePath = this.options['base-path'];
        this.configOptions.entityName = this.options.entityName;
        this.configOptions.entityVarName = _.camelCase(this.options.entityName);
        this.configOptions.tableName = _.snakeCase(this.options.entityName)+'s';
        this.configOptions.doesNotSupportDatabaseSequences =
            this.configOptions.databaseType === 'mysql';
        this.configOptions.formatCode = this.options.formatCode !== false
    }

    writing() {
        this._generateAppCode(this.configOptions);
    }

    end() {
        if(this.configOptions.formatCode !== false) {
            this._formatCode(this.configOptions, null);
        }
    }

    _generateAppCode(configOptions) {
        const mainJavaTemplates = [
            {src: 'entities/Entity.java', dest: 'entities/'+configOptions.entityName+'.java'},
            {src: 'model/response/PagedResult.java', dest: 'model/response/PagedResult.java'},
            {src: 'repositories/Repository.java', dest: 'repositories/'+configOptions.entityName+'Repository.java'},
            {src: 'services/Service.java', dest: 'services/'+configOptions.entityName+'Service.java'},
            {src: 'web/controllers/Controller.java', dest: 'web/controllers/'+configOptions.entityName+'Controller.java'},
        ];
        this.generateMainJavaCode(configOptions, mainJavaTemplates);

        const testJavaTemplates = [
            {src: 'web/controllers/ControllerTest.java', dest: 'web/controllers/'+configOptions.entityName+'ControllerTest.java'},
            {src: 'web/controllers/ControllerIT.java', dest: 'web/controllers/'+configOptions.entityName+'ControllerIT.java'},
            {src: 'services/ServiceTest.java', dest: 'services/'+configOptions.entityName+'ServiceTest.java'},
        ];
        this.generateTestJavaCode(configOptions, testJavaTemplates);
    }

};
