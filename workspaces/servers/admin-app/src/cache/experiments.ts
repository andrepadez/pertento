export class ExperimentsCache {
  private experiments = new Map();

  public has(websiteId: string) {
    return this.experiments.has(websiteId);
  }

  public get(websiteId: string) {
    return this.experiments.get(websiteId);
  }

  public set(websiteId, experiments) {
    this.experiments.set(websiteId, experiments);
  }

  public bust(userId: string) {
    this.experiments.delete(websiteId);
  }

  public clear() {
    this.experiments.clear();
  }
}
