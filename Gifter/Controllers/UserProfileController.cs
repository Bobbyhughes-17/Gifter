using Microsoft.AspNetCore.Mvc;
using Gifter.Models;
using Gifter.Repositories;

namespace Gifter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userRepository;

        public UserProfileController(IUserProfileRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var userProfile = _userRepository.GetById(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpGet("{id}/posts")]
        public IActionResult GetPostsByUserId(int id)
        {
            var posts = _userRepository.GetPostsByUserId(id);
            if (posts == null)
            {
                return NotFound();
            }
            return Ok(posts);
        }

        [HttpPost]
        public IActionResult Create(UserProfile userProfile)
        {
            _userRepository.Create(userProfile);
            return CreatedAtAction("GetById", new { id = userProfile.Id }, userProfile);
        }

        // PUT: api/UserProfile/{id}
        [HttpPut("{id}")]
        public IActionResult Update(int id, UserProfile userProfile)
        {
            if (id != userProfile.Id)
            {
                return BadRequest();
            }

            var existingProfile = _userRepository.GetById(id);
            if (existingProfile == null)
            {
                return NotFound();
            }

            _userRepository.Update(userProfile);

            return NoContent();
        }

        // DELETE: api/UserProfile/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existingProfile = _userRepository.GetById(id);
            if (existingProfile == null)
            {
                return NotFound();
            }

            _userRepository.Delete(id);

            return NoContent();
        }
    }
}
    

