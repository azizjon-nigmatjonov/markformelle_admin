import mqtt from 'mqtt';

// Example configuration
const options: any = {
  protocol: 'wss',
  host: 'tb5e5171.ala.asia-southeast1.emqxsl.com',
  port: 8084,
  path: '/mqtt',  // Check if the server expects a specific path
  username: "test",
  password: "XFUdQkqH5FG2GMA",
  // Performance optimizations
  keepalive: 60,
  reconnectPeriod: 1000,
  connectTimeout: 30000,
  clean: true,
  // Throttle message processing
  queueQoSZero: false
};

const client = mqtt.connect(options);

// Message processing queue to prevent blocking
let messageQueue: any[] = [];
let isProcessing = false;

const processMessageQueue = () => {
  if (isProcessing || messageQueue.length === 0) return;
  
  isProcessing = true;
  
  const processNext = () => {
    if (messageQueue.length === 0) {
      isProcessing = false;
      return;
    }
    
    const message = messageQueue.shift();
    try {
      // Process message here
      console.log('Processing message:', message);
    } catch (error) {
      console.error('Error processing message:', error);
    }
    
    // Use requestAnimationFrame to prevent blocking
    requestAnimationFrame(processNext);
  };
  
  requestAnimationFrame(processNext);
};

client.on('connect', function () {
  console.log('Connected to MQTT');
});

client.on('error', function (err) {
  console.error('MQTT Connection error:', err);
});

client.on('message', function (topic, message) {
  // Add message to queue instead of processing immediately
  messageQueue.push({ topic, message: message.toString() });
  
  // Process queue if not already processing
  if (!isProcessing) {
    processMessageQueue();
  }
});

// Throttle reconnection attempts
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;

client.on('close', function () {
  if (reconnectAttempts < maxReconnectAttempts) {
    reconnectAttempts++;
    console.log(`MQTT connection closed. Reconnect attempt ${reconnectAttempts}/${maxReconnectAttempts}`);
  } else {
    console.error('Max MQTT reconnection attempts reached');
  }
});

client.on('reconnect', function () {
  console.log('MQTT reconnecting...');
  reconnectAttempts = 0;
});

export default client