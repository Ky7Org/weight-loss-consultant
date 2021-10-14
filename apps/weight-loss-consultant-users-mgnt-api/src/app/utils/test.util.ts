import { RemoveOptions, SaveOptions } from 'typeorm';

export const baseEntity = {
  hasId(): boolean {
    return false;
  },
  recover(options?: SaveOptions): Promise<any> {
    return Promise.resolve();
  },
  reload(): Promise<void> {
    return Promise.resolve();
  },
  remove(options?: RemoveOptions): Promise<any> {
    return Promise.resolve();
  },
  save(options?: SaveOptions): Promise<any> {
    return Promise.resolve();
  },
  softRemove(options?: SaveOptions): Promise<any> {
    return Promise.resolve();
  }
}
