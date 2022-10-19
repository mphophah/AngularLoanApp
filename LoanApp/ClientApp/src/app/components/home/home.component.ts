import { Component } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { ConfigurationService } from '../../services/configuration.service';
import { LoanService } from '../../services/loan.service';
import { loan } from '../../models/loan.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeInOut]
})
export class HomeComponent {
  constructor(public configurations: ConfigurationService, private customerService: LoanService) {
    
  }


}
