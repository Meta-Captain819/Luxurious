import bcrypt from 'bcrypt';
import connectDb from '@/app/utils/connectDB';
import User from '@/app/models/User';
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { userId, oldPassword, newPassword } = req.body;

    if (!userId || !oldPassword || !newPassword) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }

    try {
        await connectDb();
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Old password is incorrect.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updateResult = await User.findOneAndUpdate({ _id: userId }, { $set: { password: hashedPassword } })

        if (updateResult.modifiedCount === 0) {
            return res.status(500).json({ error: 'Failed to update password.' });
        }

        return res.status(200).json({ message: 'Password changed successfully.' });
    } catch (error) {
        console.error('Error changing password:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}
