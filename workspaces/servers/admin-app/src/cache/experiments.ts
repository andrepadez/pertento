export class ExperimentsCache {
  private experiments = new Map();

  public has(websiteId) {
    return this.experiments.has(websiteId);
  }

  public get(websiteId) {
    return this.experiments.get(websiteId);
  }

  public set(websiteId, experiments) {
    this.experiments.set(websiteId, experiments);
  }

  public bust(websiteId) {
    this.experiments.delete(websiteId);
  }

  public clear() {
    this.experiments.clear();
  }
}

export class ExperimentsByIdCache {
  private experiments = new Map();

  public has(experimentId) {
    return this.experiments.has(experimentId);
  }

  public get(experimentId) {
    return this.experiments.get(experimentId);
  }

  public set(experimentId, experiment) {
    this.experiments.set(experimentId, experiment);
  }

  public bust(experimentId: string) {
    this.experiments.delete(experimentId);
  }

  public clear() {
    this.experiments.clear();
  }
}
