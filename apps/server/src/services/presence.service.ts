import type {PresenceRecord} from "../types/presence-record.type";
import {Subject} from "rxjs";
import type {PresenceChangeEvent} from "../types/presence-change-event.type";
import {PRESENCE_TYPE} from "../constants/const";

export class PresenceService {
    private records = new Map<string, PresenceRecord>;
    private presenceChangedSubject = new Subject<PresenceChangeEvent>();

    private static readonly OFFLINE_GRACE_MS = 5000;

    public presenceChanged$ = this.presenceChangedSubject.asObservable();

    public addConnection(userId: string, socketId: string): boolean {
        const record = this.records.get(userId);

        if (record) {
            if (record.graceTimer) {
                clearTimeout(record.graceTimer);
                record.graceTimer = null;
            }
            record.sockets.add(socketId);
            return false
        }

        this.records.set(userId, {
            sockets: new Set([socketId]),
            onlineSince: new Date(),
        });

        this.presenceChangedSubject.next({type: PRESENCE_TYPE.ONLINE, userId});
        return true;
    }

    public removeConnection(userId: string, socketId: string): void {
        const record = this.records.get(userId);

        if (!record) return;

        record.sockets.delete(socketId);

        if (record.sockets.size > 0) return;

        record.graceTimer = setTimeout(() => {
            this.records.delete(userId);
            this.presenceChangedSubject.next({type: PRESENCE_TYPE.OFFLINE, userId});
            record.graceTimer = null;
        }, PresenceService.OFFLINE_GRACE_MS);
    }

    public getOnlineUsersIds(): string[] {
        return [...this.records.keys()];
    }

    public getOnlineSince(userId: string): Date | undefined {
        return this.records.get(userId)?.onlineSince;
    }
}

export const presenceService = new PresenceService();