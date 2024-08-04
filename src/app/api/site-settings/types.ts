interface StoreHours {
  id: string;
  [key: string]: string;
}

interface TopBarMessage {
  id: string;
  message: string;
}

interface AboutContent {
  id: string;
  content: string;
}

interface SiteSettings {
  storeHours: StoreHours;
  topBarMessage: TopBarMessage;
  aboutContent: AboutContent;
}

export type { SiteSettings, StoreHours, TopBarMessage, AboutContent };
