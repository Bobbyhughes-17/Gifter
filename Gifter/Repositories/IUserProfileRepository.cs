using System.Collections.Generic;
using Gifter.Models;

namespace Gifter.Repositories
{
    public interface IUserProfileRepository
    {
        UserProfile GetById(int id);
        List<Post> GetPostsByUserId(int userId);
        void Delete(int userId);
        void Create(UserProfile userProfile);
        void Update(UserProfile userProfile);
    }
}
