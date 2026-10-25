import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  private auth = inject(AuthService); 
  private router = inject(Router);
  private ruta = inject(ActivatedRoute);

  alIniciarSesion(usuario:string, clave: string): void {
    if (this.auth.iniciarSesion(usuario,clave)){
      const volverA = this.ruta.snapshot.queryParamMap.get('volverA');
      if (volverA) {
        this.router.navigateByUrl(volverA);
      } else {
        this.router.navigate(['/productos']);
      }
    }
  }

}
