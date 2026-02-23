import ForumComments from "./ForumComments";

type ForumCommentsProps = {
  profileImage: string;
  name: string;
  email: string;
  comment: string;
};

export const forumComments: ForumCommentsProps[] = [
  {
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "John Carter",
    email: "john.carter@example.com",
    comment: "This is really helpful! I learned a lot from this discussion.",
  },
  {
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Maria Santos",
    email: "maria.santos@example.com",
    comment: "I agree with the points mentioned above. Great explanation!",
  },
  {
    profileImage: "https://randomuser.me/api/portraits/men/76.jpg",
    name: "David Lee",
    email: "david.lee@example.com",
    comment: "Can someone clarify the second part? I'm a bit confused.",
  },
  {
    profileImage: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Angela Cruz",
    email: "angela.cruz@example.com",
    comment: "Thanks for sharing this. It solved my problem!",
  },
  {
    profileImage: "https://randomuser.me/api/portraits/men/15.jpg",
    name: "Michael Tan",
    email: "michael.tan@example.com",
    comment: "Looking forward to more updates like this. Keep it up!",
  },
];

const ForumCommentsContainer = () => {
  return (
    <div className="space-y-4">
      {forumComments.map((item, index) => (
        <ForumComments
          key={index}
          profileImage={item.profileImage}
          name={item.name}
          email={item.email}
          comment={item.comment}
        />
      ))}
    </div>
  );
};

export default ForumCommentsContainer;
