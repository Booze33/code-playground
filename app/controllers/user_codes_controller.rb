require 'openai'

class UserCodesController < ApplicationController 
  before_action :set_user_code, only: [:show, :update, :destroy, :execute]
  before_action :validate_permissions, only: [:show, :update, :destroy, :execute]

  # GET /user_codes
  def index
    @user_codes = current_user.user_codes.page(params[:page]).per(10)

    render json: @user_codes
  end

  # GET /user_codes/1  
  def show
    render json: @user_code
  end

  # POST /user_codes
  def create
    @user_code = current_user.user_codes.build(user_code_params)

    if @user_code.save
      render json: @user_code, status: :created
    else  
      render json: @user_code.errors, status: :unprocessable_entity
    end
  end

  # PUT /user_codes/1
  def update
    if @user_code.update(user_code_params)
      render json: @user_code
    else
      render json: @user_code.errors, status: :unprocessable_entity
    end
  end

  # DELETE /user_codes/1
  def destroy
    @user_code.destroy
  end

  # POST /user_codes/1/execute
  def execute
    result = ExecuteUserCodeJob.perform_async(@user_code.id)

    render json: { job_id: result.job_id }
  end

  # GET /user_codes/:id/suggest
  def suggest
    suggestion = OpenAi::Codex.complete(
      prompt: "In the programming language #{@useer_code.language}, suggest improvememnts to this code: #{@user_code.code}",
      temperature: 0.5
    )

    render json: { suggestion: suggestion }
  end

  # PUT /user_codes/:id/run
  def run
    result = Runner.new(@user_code.programming_language, @user_code.code).execute

    render json: { output: result[:output], errors: result[:errors] }
  end

  private

  def set_user_code
    @user_code = current_user.user_codes.find(params[:id])
  end

  def validate_permissions
    unless @user_code.user == current_user
      render json: { error: "Not authorized" }, status: :forbidden
    end
  end

  def user_code_params
    params.require(:user_code).permit(:programming_language, :code_content)
  end
end