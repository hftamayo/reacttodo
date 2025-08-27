import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card/Card';
import { FaTimes, FaUser, FaEdit, FaSave } from 'react-icons/fa';
import { formStyles } from '@/shared/utils/twind/styles';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';

interface ProfileCardProps {
  onClose?: () => void;
  title?: string;
}

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  joinDate?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  onClose = () => {},
  title,
}) => {
  const { group } = useTranslation('profileForm');
  const [isEditing, setIsEditing] = useState(false);

  // TODO: Get user profile from Redux/API
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Task management enthusiast',
    joinDate: '2024-01-15',
  });

  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const handleSave = async () => {
    try {
      // TODO: Implement profile update logic with useUserMutations
      console.log('Updating profile:', editedProfile);
      setProfile(editedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  if (!group) {
    return (
      <Card className="min-w-[500px]">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex-1 text-center">
              <CardTitle className={formStyles.title}>User Profile</CardTitle>
            </div>
            <button
              onClick={onClose}
              className={formStyles.closeButton}
              aria-label="Close Form"
            >
              <FaTimes className={formStyles.closeIcon} />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <FaUser className="w-10 h-10 text-blue-600" />
                )}
              </div>
              {isEditing && (
                <button className="text-sm text-blue-600 hover:underline">
                  Change Photo
                </button>
              )}
            </div>

            {/* Profile Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        name: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg">{profile.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        email: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg">{profile.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    value={editedProfile.bio || ''}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        bio: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg min-h-[80px]">
                    {profile.bio || 'No bio provided'}
                  </p>
                )}
              </div>

              {!isEditing && profile.joinDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Member Since
                  </label>
                  <p className="p-3 bg-gray-50 rounded-lg">
                    {new Date(profile.joinDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <FaSave className="w-4 h-4" />
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <FaEdit className="w-4 h-4" />
                    Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="min-w-[500px]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex-1 text-center">
            <CardTitle className={formStyles.title}>
              {title || group.cardTitle}
            </CardTitle>
          </div>
          <button
            onClick={onClose}
            className={formStyles.closeButton}
            aria-label="Close Form"
          >
            <FaTimes className={formStyles.closeIcon} />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        {/* TODO: Implement ProfileForm component */}
        <div className="text-center">
          <p>{group.placeholder || 'Profile form will be implemented here'}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
