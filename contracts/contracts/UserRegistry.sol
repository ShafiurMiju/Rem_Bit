// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRegistry {
    struct User {
        address userAddress;
        bytes32 hashedPassword;
        string firstName;
        string lastName;
        string email;
    }

    mapping(address => User) private users;
    mapping(string => address) private emailToAddress; // Map email to address for validation

    event UserRegistered(address indexed userAddress, string firstName, string lastName, string email);

    // Register a new user
    function register(
        bytes32 hashedPassword,
        string memory firstName,
        string memory lastName,
        string memory email
    ) public {
        require(users[msg.sender].userAddress == address(0), "User already registered");
        require(emailToAddress[email] == address(0), "Email already registered");

        users[msg.sender] = User({
            userAddress: msg.sender,
            hashedPassword: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            email: email
        });

        emailToAddress[email] = msg.sender;

        emit UserRegistered(msg.sender, firstName, lastName, email);
    }

    // Login user by verifying password hash
    function login(string memory email, bytes32 hashedPassword) public view returns (bool) {
        address userAddress = emailToAddress[email];
        require(userAddress != address(0), "User not found");
        return users[userAddress].hashedPassword == hashedPassword;
    }

    // Fetch user details
    function getUser(address userAddress)
        public
        view
        returns (
            string memory firstName,
            string memory lastName,
            string memory email
        )
    {
        require(users[userAddress].userAddress != address(0), "User not registered");
        User memory user = users[userAddress];
        return (user.firstName, user.lastName, user.email);
    }
}
