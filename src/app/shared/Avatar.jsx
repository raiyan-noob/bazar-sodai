const Avatar = ({ user, size = "size-8" }) => {
  if (user?.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={user.image} alt={user.name} referrerPolicy="no-referrer" className={`${size} rounded-full object-cover`} />;
  }
  return (
    <span className={`${size} grid place-items-center rounded-full bg-primary text-sm font-bold text-white`}>
      {user?.name?.[0]?.toUpperCase() || "U"}
    </span>
  );
};

export default Avatar;