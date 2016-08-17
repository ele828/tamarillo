import {SequelizeDriver,sequelizeModelPool,Model} from './';

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
  static sync<E extends Model>(object: E, ...args): Promise<E> {
    let objectName = object.constructor.name.toLowerCase();
    let model: any = sequelizeModelPool.poll(objectName);
    return model.sync(...args);
  }

  /**
   * Create a record in specific table
   * 
   * @static
   * @param {Object} object
   * @returns
   */
  static create<E extends Model>(object: E): Promise<E> {
    let objectName = object.constructor.name.toLowerCase();
    let model: any = sequelizeModelPool.poll(objectName);
    return model.create(object);
  }

  /**
   * Construct a QueryInterface
   * TODO: modify all query API
   * 
   * @static
   * @returns
   */
  static where<E extends Model>(clazz: E): E[] {
    let entityName = clazz.constructor.name.toLowerCase();
    let model: any = sequelizeModelPool.poll(entityName);
    return model.findAll();
  }

}