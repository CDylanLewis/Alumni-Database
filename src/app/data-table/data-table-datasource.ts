import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  FName: string;
  LName: string;
  Email: string;
  Phone: string;
  Company: string;
  Position: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [
  { FName: 'Kelse', LName: 'Berry', Email: 'kelse_berry@yahoo.com', Phone: '2108753811', Company: 'Stillwater Medical Center', Position: 'Tech' },
  { FName: 'Jakob', LName: 'Cox', Email: 'jcox_97@sbcglobal.net', Phone: '2812242729', Company: 'AEG Fules', Position: 'Global Sales Analyst' },
  { FName: 'Dylan', LName: 'Hixson-Lewis', Email: 'cdylanlewis1996@gmail.com', Phone: '9188141362', Company: 'OSU', Position: 'Tech' },
  { FName: 'Emily', LName: 'Ladd', Email: 'e_ladd@outlook.com', Phone: '8065776310', Company: 'Paycom', Position: 'Scrum Master' },
  { FName: 'Kap', LName: 'Lian', Email: 'gylianpu@yahoo.com', Phone: '9182001771', Company: 'Sian Sushi', Position: 'Owner' },
  { FName: 'Hunter', LName: 'Pogue', Email: 'hpogue777@gmail.com', Phone: '9188592209', Company: 'ExxonMobil', Position: 'IT' },
  { FName: 'Brady', LName: 'Sestak', Email: 'brady.sestak@gmail.com', Phone: 'N/A', Company: 'Paycom', Position: 'Software designer' },
  { FName: 'Maddy', LName: 'Thompson', Email: 'mad.thomspon', Phone: '4059026268', Company: 'Tinker AFB', Position: 'Contracting Specialist' },
  { FName: 'Matthew', LName: 'Tucker', Email: 'matthew.tucker.d@outlook.com', Phone: '8178761028', Company: 'Microsoft', Position: 'Associate Services Consultant' },
  { FName: 'Robert', LName: 'Underwood', Email: 'runderw@okstate.edu', Phone: '9182693425', Company: 'ConocoPhillips', Position: 'IT Analyst' },
  { FName: 'Brenden', LName: 'Wedel', Email: 'bvwedel@yahoo.com', Phone: '5803954071', Company: 'Stillwater Medical Center', Position: 'Tech' },
  { FName: 'Nathan', LName: 'Wood', Email: 'nathan_wood013@yahoo.com', Phone: '4052074964', Company: 'Tinker AFB', Position: 'Program Analyst' },

];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;
  filter: string;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'FName': return compare(a.FName, b.FName, isAsc);
        case 'LName': return compare(+a.LName, +b.LName, isAsc);
        case 'Email': return compare(a.Email, b.Email, isAsc);
        case 'Phone': return compare(+a.Phone, +b.Phone, isAsc);
        case 'Company': return compare(a.Company, b.Company, isAsc);
        case 'Position': return compare(+a.Position, +b.Position, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
