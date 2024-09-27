export const webHookHandlers: { [key: string]: (data: any) => void } = {
  'checkout.session.completed': (data) => {
    console.log('Checkout completed successfully', data);
  },
  'payment_intent.succeeded': (data) => {
    console.log('Payment succeeded', data);
  },
  'payment_intent.payment_failed': (data) => {
    console.log('Payment Failed', data);
  },
};
