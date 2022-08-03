declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly MONGODB_URI: string;
    }
  }
}

export {};
