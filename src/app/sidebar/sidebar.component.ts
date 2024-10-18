import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AuthenticationService } from '../Account/authentication.service';
import { Router } from '@angular/router';
import { DialogService } from '../Dialogs/dialog.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  userName: string | null = null;
  userRole: string | null = null;
  userProfileImage: string | null = null;
  userStatusEmotion: string | null = null;
  isUserOnline: boolean = false;
  public onlineUsers: string[] = [];
  public allUsers: string[] = [];
  activeChatUser: string | null = null; // Active user in chat
  chatMessages: { user: string, content: string }[] = [];
  newMessage: string = '';
  currentChatUser: string | null = null; // Add this line to fix the error
  isCollapsed = false;

  @Output() sidebarToggled = new EventEmitter<boolean>();
  @Output() themeChanged = new EventEmitter<string>();
  
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef; // Reference to the file input

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public dialogService: DialogService,
 
  ) {}



  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const firstName = decodedToken['FirstName'];
      const lastName = decodedToken['LastName'];
      this.userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
      this.userName = `${firstName} ${lastName}`;
      
      // Removed code related to profile picture and online status
    }
  }
  
  

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggled.emit(this.isCollapsed);
  }

  confirmLogout() {
    this.dialogService.confirm('Are you sure you want to log out?').subscribe(
      (result: boolean) => {
        if (result) {
          this.authService.logout().subscribe(
            () => {
              localStorage.clear();
              this.router.navigate(['/login']).then(() => {
                window.location.reload();
              });
            },
            error => {
              console.error('Logout failed', error);
              this.dialogService.showError('Logout failed. Please try again.');
            }
          );
        }
      },
      error => {
        console.error('Dialog error', error);
        this.dialogService.showError('An error occurred. Please try again.');
      }
    );
  }

  // Trigger the file input dialog
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }


}


