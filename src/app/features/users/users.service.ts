import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DataTableColumn } from '../../shared/components/data-table/data-table';
import { ManagedUser, UserListResponse, UserWritable } from './models/user.model';

export interface UserListParams {
  first?: number;
  pageSize?: number;
  sortField?: string;
  sortOrder?: 1 | -1;
}

export interface UsersSchema {
  columns: DataTableColumn[];
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly http = inject(HttpClient);
  private readonly api = `${environment.apiUrl}/users`;

  getSchema(): Observable<UsersSchema> {
    return this.http.get<UsersSchema>(`${this.api}/columns`);
  }

  list(params: UserListParams = {}): Observable<UserListResponse> {
    let httpParams = new HttpParams();
    if (params.first != null) httpParams = httpParams.set('first', String(params.first));
    if (params.pageSize != null) httpParams = httpParams.set('pageSize', String(params.pageSize));
    if (params.sortField) httpParams = httpParams.set('sortField', params.sortField);
    if (params.sortOrder) httpParams = httpParams.set('sortOrder', String(params.sortOrder));
    return this.http.get<UserListResponse>(this.api, { params: httpParams });
  }

  create(data: UserWritable): Observable<ManagedUser> {
    return this.http.post<ManagedUser>(this.api, data);
  }

  update(id: string, data: Partial<UserWritable>): Observable<ManagedUser> {
    return this.http.patch<ManagedUser>(`${this.api}/${id}`, data);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
