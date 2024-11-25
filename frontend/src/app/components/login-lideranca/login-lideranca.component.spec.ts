import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLiderancaComponent } from './login-lideranca.component';

describe('LoginLiderancaComponent', () => {
  let component: LoginLiderancaComponent;
  let fixture: ComponentFixture<LoginLiderancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginLiderancaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginLiderancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
