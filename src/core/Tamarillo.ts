import {SequelizeDriver,sequelizeSchemaPool,Model} from './';

/**
 * Tarmarillo core
 */
export class Tamarillo {
  /**
   * Sequalize sequelize driver instance
   * 
   * @private
   * @static
   * @type {SequelizeDriver}
   */
  private static _driver: SequelizeDriver;

  /**
   * Connect to database
   * 
   * @static
   * @param {any} args
   */
  static connect(...args) {
    this._driver = SequelizeDriver.connect(...args);
  }

  /**
   * Get sequelize driver instance
   * 
   * @readonly
   * @static
   * @type {*}
   */
  static get driver(): any {
    return this._driver;
  }

  /**
   * Table schema Synchronous
   * 
   * @static
   * @param {any} args
   * @returns
   */
  static sync(object: Object, ...args): Promise<Model> {
    let objectName = object.constructor.name.toLowerCase();
    let model: any = sequelizeSchemaPool.poll(objectName);
    return model.sync(...args);
  }

  /**
   * Create a record in specific table
   * 
   * @static
   * @param {Object} object
   * @returns
   */
  static create(object: Object): Promise<Model> {
    let objectName = object.constructor.name.toLowerCase();
    let model: any = sequelizeSchemaPool.poll(objectName);
    return model.create(object);
  }

  /**
   * Find all records in specific table
   * 
   * @static
   * @returns
   */
  static findAll<E extends Model>(clazz: E): E[] {
    let entityName = clazz.constructor.name.toLowerCase();
    let model: any = sequelizeSchemaPool.poll(entityName);
    return model.findAll();
  }

}