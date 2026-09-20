/**
 * Shape of the rows in the generated project data file. Kept separate so the
 * generated module stays pure data and can be rewritten safely on every build.
 */
export interface GeneratedProjectRow {
  readonly slug: string;
  readonly name: string;
  readonly domain: string;
  readonly summary: string;
  readonly description: string;
  readonly tech: readonly string[];
  readonly url: string;
  readonly icon: string;
  readonly started: string;
  readonly detail_path: string | null;
  readonly credits: readonly { readonly name: string; readonly url: string }[];
  readonly sites: readonly { readonly name: string; readonly url: string }[];
}
