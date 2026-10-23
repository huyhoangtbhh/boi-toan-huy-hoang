def lengthOfLongestSubstring(s: str) -> int:
    """
    Tìm độ dài của chuỗi con dài nhất không chứa ký tự trùng lặp.
    Thuật toán: Sliding Window (Cửa sổ trượt) + Hash Map.
    Độ phức tạp: O(n) thời gian, O(min(n, m)) không gian bộ nhớ.
    """
    char_map = {}  # Lưu ký tự và index gần nhất của nó
    left = 0
    max_len = 0

    for right, char in enumerate(s):
        # Nếu ký tự đã có trong map và nằm trong phạm vi cửa sổ hiện tại
        if char in char_map and char_map[char] >= left:
            left = char_map[char] + 1

        # Cập nhật vị trí mới nhất của ký tự
        char_map[char] = right

        # Cập nhật độ dài lớn nhất
        max_len = max(max_len, right - left + 1)

    return max_len


if __name__ == "__main__":
    test_cases = [
        ("abcabcbb", 3),  # "abc"
        ("bbbbb", 1),     # "b"
        ("pwwkew", 3),    # "wke"
        ("", 0),
        (" ", 1),
        ("au", 2),
        ("dvdf", 3)       # "vdf"
    ]

    print("=== KIỂM TRA CÁC TEST CASES ===")
    for s, expected in test_cases:
        result = lengthOfLongestSubstring(s)
        status = "PASSED" if result == expected else "FAILED"
        print(f"s = {repr(s):12} => Output: {result:<3} | Expected: {expected:<3} [{status}]")
