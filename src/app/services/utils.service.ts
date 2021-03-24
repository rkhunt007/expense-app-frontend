import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilService {
    constructor() { }

    private categories = [
        { id: 1, type: 'On Credit' },
        { id: 2, type: 'Upfront' },
    ];

    getTypeFromId(id: number) {
        if (!id) {
            return '';
        } else {
            const cat = this.categories.filter((cat) => cat.id === id);
            if (cat.length == 1) {
                return cat[0].type;
            }
            return '';
        }
    }

    getIdFromType(type: string) {
        if (!type) {
            return 0;
        } else {
            const cat = this.categories.filter((cat) => cat.type === type);
            if (cat.length == 1) {
                return cat[0].id;
            }
            return '';
        }
    }

}