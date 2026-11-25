export interface PresenceRecord {
    sockets: Set<string>;
    onlineSince: Date;
    graceTimer?: NodeJS.Timeout | null;
}