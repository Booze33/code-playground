class Runner
  def initialize(language, code)
    @language = language
    @code = code 
  end

  def execute
    case @language
    when 'Ruby'
      execute_ruby_code
    when 'JavaScript'
      execute_javascript_code
    when 'Python'
      execute_python_code
    else
      { success: false, error: 'Unsupported programming language' }
    end
  end

  private

  def execute_ruby_code
    result = `ruby -e "#{@code}"`
    { success: true, result: result }
  end

  def execute_javascript_code
    node_server = NodeJsServer.new
    result = node_server.execute(code_content)
    { success: true, result: result }
  end

  def execute_python_code
    repl_it = ReplItService.new
    result = repl_it.execute_python_code(code_content)
    { success: true, result: result }
  end
end
