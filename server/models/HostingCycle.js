import mongoose from 'mongoose';

const hostingCycleSchema = new mongoose.Schema({
  namePAckage:{type:String , required:true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  cost: { type: Number, required: true },
  duration: { type: String, enum: ['6 months', '1 year'], required: true },
});

const HostingCycle = mongoose.model('HostingCycle', hostingCycleSchema);

export default HostingCycle;