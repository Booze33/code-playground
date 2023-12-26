require "test_helper"

class UserCodesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user_code = user_codes(:one)
  end

  test "should get index" do
    get user_codes_url, as: :json
    assert_response :success
  end

  test "should create user_code" do
    assert_difference("UserCode.count") do
      post user_codes_url, params: { user_code: { code: @user_code.code, description: @user_code.description } }, as: :json
    end

    assert_response :created
  end

  test "should show user_code" do
    get user_code_url(@user_code), as: :json
    assert_response :success
  end

  test "should update user_code" do
    patch user_code_url(@user_code), params: { user_code: { code: @user_code.code, description: @user_code.description } }, as: :json
    assert_response :success
  end

  test "should destroy user_code" do
    assert_difference("UserCode.count", -1) do
      delete user_code_url(@user_code), as: :json
    end

    assert_response :no_content
  end
end
