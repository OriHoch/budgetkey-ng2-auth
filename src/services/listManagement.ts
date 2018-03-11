import {Inject, Injectable, OpaqueToken} from '@angular/core';
import * as _ from 'lodash';
import * as Promise from 'bluebird';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map'
import { AuthService } from "./auth";

const LIST_MANAGEMENT_CONFIG_TOKEN = new OpaqueToken('Auth Config');

export function getListManagementServiceConfigProvider(listManagementServerUrl:string) {
    return {
        provide: LIST_MANAGEMENT_CONFIG_TOKEN,
        useValue: {"listManagementServerUrl": listManagementServerUrl}
    }
}

@Injectable()
export class ListManagementService {
    constructor(private http: Http, private auth: AuthService, @Inject(LIST_MANAGEMENT_CONFIG_TOKEN) private config: any) {}

    add(list: string, item: any): PromiseLike<any> {
        return new Promise((resolve, reject) => {
            if (this.auth.user) {
                let jwt = this.auth.user.jwt;
                if (jwt) {
                    this.http
                        .put(this.config.listManagementServerUrl + '/list', {"jwt": jwt, "list": list, "item": item})
                        .map(res => res.json())
                        .subscribe(res => resolve(res), res => {resolve(false)});
                } else {
                    resolve(false);
                }
            } else {
                resolve(false);
            }

        });
    }
}
