import schedule from 'node-schedule';
import userModel from './models/userModel';
import HostingCycle from './models/hostingCycleModel';

const checkPackageExpiration = async () => {
  try {
    const now = new Date();
    const twoMonthsLater = new Date(now);
    twoMonthsLater.setMonth(now.getMonth() + 2);

    const oneDayLater = new Date(now);
    oneDayLater.setDate(now.getDate() + 1);

    // Fetch hosting cycles nearing expiration
    const expiringCycles = await HostingCycle.find({
      endDate: { $gte: now, $lte: oneDayLater },
    });

    const users = await userModel.find({ websites: { $in: expiringCycles.map(c => c._id) } });

    users.forEach((user) => {
      console.log(`User ${user.name} has a package expiring soon.`);
      // Send notification logic here (email, in-app, etc.)
    });

    console.log(`Checked for expiring packages at ${new Date().toISOString()}`);
  } catch (error) {
    console.error('Error checking package expiration:', error);
  }
};

// Schedule job to run every day at midnight
schedule.scheduleJob('0 0 * * *', checkPackageExpiration);

console.log('Scheduled job to check for expiring packages.');
