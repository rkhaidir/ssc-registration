import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const translations = {
  id: {
    nav: {
      open: 'Registration Open',
      closed: 'Registration Closed',
    },
    hero: {
      openRegistration: 'OPEN REGISTRATION',
      description:
        'Daftarkan diri Anda untuk mengikuti ronde berikutnya. Peserta yang sudah pernah terdaftar cukup melakukan check-in.',
      currentRound: 'CURRENT ROUND',
      loadingRound: 'Memuat ronde...',
    },
    closed: {
      title: 'Pendaftaran ditutup.',
      description: 'Pendaftaran untuk ronde ini saat ini belum tersedia.',
    },
    tabs: {
      newParticipant: 'Peserta Baru',
      checkIn: 'Check-In',
    },
    form: {
      newTitle: 'Pendaftaran Peserta Baru',
      newDescription:
        'Isi data dengan benar. Steam GUID dan nomor balap hanya dapat digunakan oleh satu peserta.',
      fullName: 'Nama Lengkap',
      fullNamePlaceholder: 'Max Verstappen',
      teamName: 'Nama Tim',
      teamNamePlaceholder: 'Contoh: 97 Racing Team',
      racingNumber: 'Nomor Balap',
      steamGuid: 'Steam GUID',
      discord: 'Username Discord',
      instagram: 'Username Instagram',
      checkingGuid: 'Memeriksa Steam GUID...',
      guidUsed: 'Steam GUID sudah terdaftar. Silakan gunakan menu Check-In.',
      guidAvailable: 'Steam GUID tersedia.',
      guidCheckFailed: 'Gagal memeriksa Steam GUID.',
      submit: 'DAFTAR SEKARANG',
      submitting: 'MENDAFTARKAN...',
    },
    validation: {
      invalidNumber: 'Nomor balap harus 1-999 dan tidak boleh diawali angka 0.',
      usedNumber: 'Nomor #{number} sudah digunakan.',
      availableNumber: 'Nomor #{number} tersedia.',
    },
    usedNumbers: {
      label: 'DRIVER LIST',
      title: 'Nomor Terpakai',
      description:
        'Nomor berikut sudah terdaftar dan tidak dapat digunakan oleh pembalap lain.',
    },
    info: {
      title: 'Informasi',
      guid: 'Satu Steam GUID hanya untuk satu peserta.',
      number: 'Nomor balap hanya 1-999 dan bersifat unik.',
      checkin: 'Peserta lama cukup melakukan check-in.',
      discord: 'Pastikan username Discord benar.',
    },
    checkin: {
      title: 'Check-In Peserta',
      description:
        'Sudah pernah mengikuti championship? Masukkan Steam GUID yang digunakan saat melakukan pendaftaran pertama kali.',
      guidRequired: 'Masukkan Steam GUID terlebih dahulu.',
      participantNotFound: 'Peserta tidak ditemukan.',
      placeholder: 'Masukkan Steam GUID',
      search: 'Cari',
      found: 'DRIVER FOUND',
      team: 'TEAM',
      status: 'STATUS',
      round: 'ROUND',
      checked: 'SUDAH CHECK-IN',
      notChecked: 'BELUM CHECK-IN',
      processing: 'MEMPROSES...',
      action: 'CHECK-IN ROUND INI',
    },
    success: {
      label: 'REGISTRATION COMPLETE',
      checkinTitle: 'Check-In Successful!',
      registrationTitle: 'Registration Successful!',
      checkinDescription:
        'Anda berhasil melakukan check-in dan terdaftar pada ronde ini.',
      registrationDescription:
        'Data Anda berhasil didaftarkan dan otomatis terdaftar pada ronde ini.',
      driver: 'DRIVER',
      racingNumber: 'RACING NUMBER',
      round: 'ROUND',
      discord: 'JOIN DISCORD SERVER',
      back: 'Kembali ke halaman pendaftaran',
    },
    errors: {
      usedNumbers: 'Gagal mengambil nomor balap.',
      registrationData: 'Gagal mengambil data pendaftaran.',
    },
  },

  en: {
    nav: {
      open: 'Registration Open',
      closed: 'Registration Closed',
    },
    hero: {
      openRegistration: 'OPEN REGISTRATION',
      description:
        'Register to join the upcoming round. Drivers who have registered before only need to check in.',
      currentRound: 'CURRENT ROUND',
      loadingRound: 'Loading round...',
    },
    closed: {
      title: 'Registration is closed.',
      description: 'Registration for this round is currently unavailable.',
    },
    tabs: {
      newParticipant: 'New Driver',
      checkIn: 'Check-In',
    },
    form: {
      newTitle: 'New Driver Registration',
      newDescription:
        'Enter your information correctly. Each Steam GUID and racing number can only be used by one driver.',
      fullName: 'Full Name',
      fullNamePlaceholder: 'Max Verstappen',
      teamName: 'Team Name',
      teamNamePlaceholder: 'Example: 97 Racing Team',
      racingNumber: 'Racing Number',
      steamGuid: 'Steam GUID',
      discord: 'Discord Username',
      instagram: 'Instagram Username',
      checkingGuid: 'Checking Steam GUID...',
      guidUsed: 'This Steam GUID is already registered. Please use Check-In.',
      guidAvailable: 'Steam GUID is available.',
      guidCheckFailed: 'Failed to check Steam GUID.',
      submit: 'REGISTER NOW',
      submitting: 'REGISTERING...',
    },
    validation: {
      invalidNumber: 'Racing number must be 1-999 and cannot start with 0.',
      usedNumber: 'Number #{number} is already in use.',
      availableNumber: 'Number #{number} is available.',
    },
    usedNumbers: {
      label: 'DRIVER LIST',
      title: 'Used Numbers',
      description:
        'The following numbers are already registered and cannot be used by another driver.',
    },
    info: {
      title: 'Information',
      guid: 'One Steam GUID can only be used by one driver.',
      number: 'Racing numbers must be 1-999 and unique.',
      checkin: 'Returning drivers only need to check in.',
      discord: 'Make sure your Discord username is correct.',
    },
    checkin: {
      title: 'Driver Check-In',
      description:
        'Already participated in the championship? Enter the Steam GUID used during your first registration.',
      guidRequired: 'Enter your Steam GUID first.',
      participantNotFound: 'Driver not found.',
      placeholder: 'Enter Steam GUID',
      search: 'Search',
      found: 'DRIVER FOUND',
      team: 'TEAM',
      status: 'STATUS',
      round: 'ROUND',
      checked: 'CHECKED IN',
      notChecked: 'NOT CHECKED IN',
      processing: 'PROCESSING...',
      action: 'CHECK IN FOR THIS ROUND',
    },
    success: {
      label: 'REGISTRATION COMPLETE',
      checkinTitle: 'Check-In Successful!',
      registrationTitle: 'Registration Successful!',
      checkinDescription:
        'You have successfully checked in and are registered for this round.',
      registrationDescription:
        'Your data has been registered successfully and you are automatically entered for this round.',
      driver: 'DRIVER',
      racingNumber: 'RACING NUMBER',
      round: 'ROUND',
      discord: 'JOIN DISCORD SERVER',
      back: 'Back to registration page',
    },
    errors: {
      usedNumbers: 'Failed to load racing numbers.',
      registrationData: 'Failed to load registration data.',
    },
  },
};

const LanguageContext = createContext(null);

function getNestedValue(object, path) {
  return path.split('.').reduce((value, key) => value?.[key], object);
}

function interpolate(text, variables = {}) {
  return String(text).replace(/\{(\w+)\}/g, (_, key) => variables[key] ?? `{${key}}`);
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('ssc-language') || 'id');

  useEffect(() => {
    localStorage.setItem('ssc-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => {
    function t(key, variables) {
      const translated = getNestedValue(translations[language], key);
      const fallback = getNestedValue(translations.id, key);
      return interpolate(translated ?? fallback ?? key, variables);
    }

    return {
      language,
      setLanguage,
      t,
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return context;
}
