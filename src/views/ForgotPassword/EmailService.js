// EmailService.js (This is a dummy implementation. In a real application, you would replace this with your backend logic.)
const EmailService = {
    sendPasswordResetEmail: async (email) => {
      // Simulate sending email
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === 'test@example.com') {
            resolve();
          } else {
            reject(new Error('Email address not found'));
          }
        }, 1000);
      });
    },
  };
  
  export default EmailService;
  