import { LanguageContextType } from '@/shared/types/settings/settings.type';
import { LucideBlend } from 'lucide-react';

export const stringMessages: LanguageContextType = {
  //dashboard header components:
  dropDownHeaderBar: {
    en: {
      group: {
        profile: 'Profile',
        settings: 'Settings',
        logout: 'Logout',
      },
    },
    es: {
      group: {
        profile: 'Perfil',
        settings: 'Configuración',
        logout: 'Cerrar sesión',
      },
    },
    de: {
      group: {
        profile: 'Profil',
        settings: 'Einstellungen',
        logout: 'Ausloggen',
      },
    },
  },

  searchTextControl: {
    en: {
      text: 'Search criteria...',
    },
    es: {
      text: 'Criterio de busqueda...',
    },
    de: {
      text: 'Suchkriterium...',
    },
  },

  searchTextValidation: {
    en: {
      text: 'Task name must be at least 5 characters',
    },
    es: {
      text: 'El nombre de la tarea debe tener al menos 5 caracteres',
    },
    de: {
      text: 'Der Aufgabenname muss mindestens 5 Zeichen lang sein',
    },
  },

  themeButtonOn: {
    en: {
      text: 'Dark Mode On',
    },
    es: {
      text: 'Modo oscuro activado',
    },
    de: {
      text: 'Dunkler Modus an',
    },
  },

  themeButtonOff: {
    en: {
      text: 'Dark Mode Off',
    },
    es: {
      text: 'Modo oscuro desactivado',
    },
    de: {
      text: 'Dunkler Modus aus',
    },
  },
  //dashboard header components end

  //dashboard footer components

  //labels to display on footer
  statusOn: {
    en: {
      text: 'Online',
    },
    es: {
      text: 'En linea',
    },
    de: {
      text: 'Online',
    },
  },

  statusOff: {
    en: {
      text: 'Offline',
    },
    es: {
      text: 'Desconectado',
    },
    de: {
      text: 'Offline',
    },
  },

  noConnection: {
    en: {
      text: 'No Connection',
    },
    es: {
      text: 'Sin Conexion',
    },
    de: {
      text: 'Keine Verbindung',
    },
  },

  //messages to display in the toaster
  statusOnline: {
    en: {
      text: 'System Operational',
    },
    es: {
      text: 'Sistema Operacional',
    },
    de: {
      text: 'Systembetrieb',
    },
  },

  statusOffline: {
    en: {
      text: 'System Unavailable',
    },
    es: {
      text: 'Sistema No Disponible',
    },
    de: {
      text: 'System nicht verfügbar',
    },
  },

  statusNoConnection: {
    en: {
      text: 'No Connection',
    },
    es: {
      text: 'Sin conexion',
    },
    de: {
      text: 'Keine Verbindung',
    },
  },

  statusChecking: {
    en: {
      text: 'Checking status...',
    },
    es: {
      text: 'Comprobando estado...',
    },
    de: {
      text: 'Status wird überprüft...',
    },
  },

  suggestions: {
    en: {
      text: 'Suggestions',
    },
    es: {
      text: 'Sugerencias',
    },
    de: {
      text: 'Vorschläge',
    },
  },

  serviceDesk: {
    en: {
      text: 'Service-Desk',
    },
    es: {
      text: 'Att al cliente',
    },
    de: {
      text: 'Service-Desk',
    },
  },

  //dashboard footer components end

  //menu
  //profileMenu
  sideBarDashboard: {
    en: {
      group: {
        home: 'Home',
        roles: 'Roles',
        users: 'Users',
        tasks: 'Tasks',
        reports: 'Reports',
        inbox: 'Inbox',
        settings: 'Settings',
      },
    },
    es: {
      group: {
        home: 'Inicio',
        roles: 'Roles',
        users: 'Usuarios',
        tasks: 'Tareas',
        reports: 'Informes',
        inbox: 'Mensajeria',
        settings: 'Configuraciones',
      },
    },
    de: {
      group: {
        home: 'Zuhause',
        roles: 'Rollen',
        users: 'Benutzer',
        tasks: 'Aufgaben',
        reports: 'Berichte',
        inbox: 'Posteingang',
        settings: 'Einstellungen',
      },
    },
  },

  //forms:
  confirmDialogDeleteEntity: {
    en: {
      title: 'Confirm',
      text: 'Are you sure you want to proceed?',
    },
    es: {
      title: 'Confirmar',
      text: '¿Estás seguro de que quieres continuar?',
    },
    de: {
      title: 'Bestätigen',
      text: 'Sind Sie sicher, dass Sie fortfahren möchten?',
    },
  },

  deleteRowButton: {
    en: {
      text: 'Delete a record',
    },
    es: {
      text: 'Borrar registro',
    },
    de: {
      text: 'Eintrag löschen',
    },
  },

  updateRowButton: {
    en: {
      text: 'Update a record',
    },
    es: {
      text: 'Actualizar registro',
    },
    de: {
      text: 'Eintrag aktualisieren',
    },
  },

  addTaskButton: {
    en: {
      text: 'Add a task',
    },
    es: {
      text: 'Agregar una tarea',
    },
    de: {
      text: 'Eine Aufgabe hinzufügen',
    },
  },

  addTaskForm: {
    en: {
      group: {
        lblplaceholder: 'Add a task',
        lblregister: 'Task name is required',
        lblminlength: 'Task name must be at least 5 characters',
      },
    },
    es: {
      group: {
        lblplaceholder: 'Agregar una tarea',
        lblregister: 'Se requiere el nombre de la tarea',
        lblminlength: 'El nombre de la tarea debe tener al menos 5 caracteres',
      },
    },
    de: {
      group: {
        lblplaceholder: 'Eine Aufgabe hinzufügen',
        lblregister: 'Aufgabenname ist erforderlich',
        lblminlength: 'Der Aufgabenname muss mindestens 5 Zeichen lang sein',
      },
    },
  },

  updateTaskForm: {
    en: {
      group: {
        cardTitle: 'Update Task',
        lblTaskTitle: 'Task Title',
        lblTaskDescription: 'Task Description',
        lblTaskStatus: 'Task Status',
        btnCancel: 'Cancel',
        btnUpdate: 'Update',
      },
    },
    es: {
      group: {
        cardTitle: 'Actualizar tarea',
        lblTaskTitle: 'Título de la tarea',
        lblTaskDescription: 'Descripción de la tarea',
        lblTaskStatus: 'Estado de la tarea',
        btnCancel: 'Cancelar',
        btnUpdate: 'Actualizar',
      },
    },
    de: {
      group: {
        cardTitle: 'Aufgabe aktualisieren',
        lblTaskTitle: 'Aufgaben Titel',
        lblTaskDescription: 'Aufgabenbeschreibung',
        lblTaskStatus: 'Aufgabenstatus',
        btnCancel: 'Abbrechen',
        btnUpdate: 'Aktualisieren',
      },
    },
  },

  dashboardAnalyticsForm: {
    en: {
      title: 'DashBoard Analytics',
    },
    es: {
      title: 'Tablero de control',
    },
    de: {
      title: 'DashBoard-Analytik',
    },
  },

  settingsForm: {
    en: {
      title: 'Settings',
      text: 'Please select your settings',
    },
    es: {
      title: 'Configuraciones',
      text: 'Seleccione los ajustes necesario',
    },
    de: {
      title: 'Einstellungen',
      text: 'Bitte wählen Sie Ihre Einstellungen',
    },
  },

  settingsFormElements: {
    en: {
      group: {
        lbllanguage: 'Language',
        lbltheme: 'Theme',
        theme01: 'Dark',
        theme02: 'Light',
        lbltimezone: 'Timezone',
        tzpholder: 'Select timezone',
        lblfsize: 'Font Size',
        fsizepholder: 'Select font size',
        lblbackup: 'Backup',
        btncancel: 'Cancel',
        btnsave: 'Save  ',
      },
    },
    es: {
      group: {
        lbllanguage: 'Idioma',
        lbltheme: 'Tema',
        theme01: 'Oscuro',
        theme02: 'Claro',
        lbltimezone: 'Zona horaria',
        tzpholder: 'Seleccionar zona horaria',
        lblfsize: 'Tamaño de fuente',
        fsizepholder: 'Seleccionar tamaño de fuente',
        lblbackup: 'Copia de seguridad',
        btncancel: 'Cancelar',
        btnsave: 'Guardar',
      },
    },
    de: {
      group: {
        lbllanguage: 'Sprache',
        lbltheme: 'Thema',
        theme01: 'Dunkel',
        theme02: 'Licht',
        lbltimezone: 'Zeitzone',
        tzpholder: 'Zeitzone auswählen',
        lblfsize: 'Schriftgröße',
        fsizepholder: 'Schriftgröße auswählen',
        lblbackup: 'Backup',
        btncancel: 'Abbrechen',
        btnsave: 'Speichern',
      },
    },
  },

  //global error component
  errorComponent: {
    en: {
      text: 'An error occurred. Please try again later.',
    },
    es: {
      text: 'Se produjo un error. Por favor, inténtelo de nuevo más tarde.',
    },
    de: {
      text: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
    },
  },
} as const;
