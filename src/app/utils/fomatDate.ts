export const formatDate = (dateString: string) => {
    try{
        const date = new Date(dateString.replace(/"/g, ''))
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) {
            return `${diffInSeconds} seconds ago`;
        } else if (diffInSeconds < 3600) {
            return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        } else if (diffInSeconds < 86400) {
            return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        } else {
            return date.toLocaleDateString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            });
        }
    } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid date";
    }
}
