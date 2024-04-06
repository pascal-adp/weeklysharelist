"use client"
interface AddFriendPageProps {
    params: {
        id: string;
    }
}

const AddFriendPage: React.FC<AddFriendPageProps> = ({ params }) => {
    return(
        <div>{params.id}</div>
    )
}

export default AddFriendPage;