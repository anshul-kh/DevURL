import { atom } from "recoil";

export interface ExternalLink {
  title: string;
  link: string;
}

export const external_links = atom<ExternalLink[]>({
  key: "ext_links",
  default: [] as ExternalLink[],
});

export const activeLink = atom({
  key: "activeLink",
  default: 0,
});

export const showLinkForm = atom({
  key: "showLinkForm",
  default: false,
});
