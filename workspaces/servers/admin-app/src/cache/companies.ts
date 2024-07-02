export class CompaniesCache {
  private companies = new Map();

  public has(parentCompanyId: string) {
    return this.companies.has(parentCompanyId);
  }

  public get(parentCompanyId: string) {
    return this.companies.get(parentCompanyId);
  }

  public set(parentCompanyId, companies) {
    this.companies.set(parentCompanyId, companies);
  }

  public bust(parentCompanyId: string) {
    this.companies.delete(parentCompanyId);
  }

  public clear() {
    this.companies.clear();
  }
}
