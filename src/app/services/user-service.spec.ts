import { TestBed } from '@angular/core/testing';
import { UserService } from './user-service';
import { User } from '../models/user';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';


describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let usersUrl:string = 'https://jsonplaceholder.typicode.com/users';

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [], providers: [ provideHttpClient(), provideHttpClientTesting(), UserService ]});
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensures no pending HTTP requests remain
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call API and return data from getUsers', (done:DoneFn) => {
    const mockResponse:User[] = [ {id:1,name:'John Doe',username:'johndoe',email:'' }];

    service.getUsers().subscribe((data) => {
      expect(data).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne(usersUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

  });

  it('should call API and return data from getUserById', (done:DoneFn) => {
    const mockResponse:User = {id:1,name:'John Doe',username:'johndoe',email:'' };
    const userId = 1;
    service.getUserById(userId).subscribe((data) => {
      expect(data).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne(`${usersUrl}/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

   });

    it('should handle errors gracefully for get User by id', (done:DoneFn) => {
    const errorMessage = '404 error';

    service.getUserById(1).subscribe({
      next: () => fail('Expected an error, not data'),
      error: (error) => {
        expect(error).toBe('There was an error trying to get the data for user with id=1');//checking the error message matches my handleError output
        done();
      }
    });
    const req = httpMock.expectOne(usersUrl + '/1');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });



});
