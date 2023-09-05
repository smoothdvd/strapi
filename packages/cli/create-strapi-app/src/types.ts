export interface Program {
  noRun?: boolean;
  useNpm?: boolean;
  usePnpm?: boolean;
  debug?: boolean;
  quickstart?: boolean;
  dbclient?: string;
  dbhost?: string;
  dbport?: string;
  dbname?: string;
  dbusername?: string;
  dbpassword?: string;
  dbssl?: string;
  dbfile?: string;
  dbforce?: boolean;
  template?: string;
  typescript?: boolean;
}
