declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"noticias": {
"artigo-branding-pequenas-empresas.md": {
	id: "artigo-branding-pequenas-empresas.md";
  slug: "artigo-branding-pequenas-empresas";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"artigo-gestao-multiplos-perfis.md": {
	id: "artigo-gestao-multiplos-perfis.md";
  slug: "artigo-gestao-multiplos-perfis";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"artigo-marketing-profissionais-saude.md": {
	id: "artigo-marketing-profissionais-saude.md";
  slug: "artigo-marketing-profissionais-saude";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"artigo-redes-sociais-clinicas.md": {
	id: "artigo-redes-sociais-clinicas.md";
  slug: "artigo-redes-sociais-clinicas";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"marketing-etico-o-que-e.md": {
	id: "marketing-etico-o-que-e.md";
  slug: "marketing-etico-o-que-e";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"novo-cliente-bethania-patricia.md": {
	id: "novo-cliente-bethania-patricia.md";
  slug: "novo-cliente-bethania-patricia";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"novo-cliente-clinica-almar.md": {
	id: "novo-cliente-clinica-almar.md";
  slug: "novo-cliente-clinica-almar";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"novo-cliente-clinica-avisa.md": {
	id: "novo-cliente-clinica-avisa.md";
  slug: "novo-cliente-clinica-avisa";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"novo-cliente-clinica-bem-fortaleza.md": {
	id: "novo-cliente-clinica-bem-fortaleza.md";
  slug: "novo-cliente-clinica-bem-fortaleza";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"novo-cliente-clinica-seraphis.md": {
	id: "novo-cliente-clinica-seraphis.md";
  slug: "novo-cliente-clinica-seraphis";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"novo-cliente-clinica-unifetos.md": {
	id: "novo-cliente-clinica-unifetos.md";
  slug: "novo-cliente-clinica-unifetos";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"novo-cliente-dr-gabriel-pinheiro.md": {
	id: "novo-cliente-dr-gabriel-pinheiro.md";
  slug: "novo-cliente-dr-gabriel-pinheiro";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"novo-cliente-dr-luiz-fernando.md": {
	id: "novo-cliente-dr-luiz-fernando.md";
  slug: "novo-cliente-dr-luiz-fernando";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"novo-cliente-dra-ana-cristina.md": {
	id: "novo-cliente-dra-ana-cristina.md";
  slug: "novo-cliente-dra-ana-cristina";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"novo-cliente-dra-bianca-poncioni.md": {
	id: "novo-cliente-dra-bianca-poncioni.md";
  slug: "novo-cliente-dra-bianca-poncioni";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"novo-cliente-dra-gabriela-esper.md": {
	id: "novo-cliente-dra-gabriela-esper.md";
  slug: "novo-cliente-dra-gabriela-esper";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"novo-cliente-dra-maysa-siqueira.md": {
	id: "novo-cliente-dra-maysa-siqueira.md";
  slug: "novo-cliente-dra-maysa-siqueira";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"novo-cliente-hospital-ivv.md": {
	id: "novo-cliente-hospital-ivv.md";
  slug: "novo-cliente-hospital-ivv";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"novo-cliente-hotel-caminito.md": {
	id: "novo-cliente-hotel-caminito.md";
  slug: "novo-cliente-hotel-caminito";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"novo-cliente-isabela-camarotti.md": {
	id: "novo-cliente-isabela-camarotti.md";
  slug: "novo-cliente-isabela-camarotti";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"novo-cliente-movi-studio-pilates.md": {
	id: "novo-cliente-movi-studio-pilates.md";
  slug: "novo-cliente-movi-studio-pilates";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"novo-cliente-pedro-paiva.md": {
	id: "novo-cliente-pedro-paiva.md";
  slug: "novo-cliente-pedro-paiva";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"novo-cliente-recanto-verde-vida.md": {
	id: "novo-cliente-recanto-verde-vida.md";
  slug: "novo-cliente-recanto-verde-vida";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"novo-cliente-rede-giraffas.md": {
	id: "novo-cliente-rede-giraffas.md";
  slug: "novo-cliente-rede-giraffas";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"novo-cliente-residencial-flor-de-lotus.md": {
	id: "novo-cliente-residencial-flor-de-lotus.md";
  slug: "novo-cliente-residencial-flor-de-lotus";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"novo-cliente-residencial-girassol.md": {
	id: "novo-cliente-residencial-girassol.md";
  slug: "novo-cliente-residencial-girassol";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"novo-cliente-studio-obarq.md": {
	id: "novo-cliente-studio-obarq.md";
  slug: "novo-cliente-studio-obarq";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"palestra-blindex-transparencia-com-elas.md": {
	id: "palestra-blindex-transparencia-com-elas.md";
  slug: "palestra-blindex-transparencia-com-elas";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"palestra-cofen-pirenopolis.md": {
	id: "palestra-cofen-pirenopolis.md";
  slug: "palestra-cofen-pirenopolis";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
"podcast-bombacast-seguranca-emocional.md": {
	id: "podcast-bombacast-seguranca-emocional.md";
  slug: "podcast-bombacast-seguranca-emocional";
  body: string;
  collection: "noticias";
  data: InferEntrySchema<"noticias">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
